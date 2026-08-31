# Vercel ENV + Deploy คู่มือ

## 1. ENV Variables ที่ต้องตั้งที่ Vercel

ไปที่ **Vercel Dashboard → Project → Settings → Environment Variables**

เพิ่มตัวแปรใหม่ทั้งหมดนี้:

| Variable | ค่า | Environment |
|---|---|---|
| `LINE_CHANNEL_ACCESS_TOKEN` | จาก LINE Console (ข้อ 3 ด้านล่าง) | Production, Preview |
| `LINE_CHANNEL_SECRET` | จาก LINE Console (ข้อ 3 ด้านล่าง) | Production, Preview |
| `LINE_ADMIN_USER_ID` | ได้จากขั้นตอน LINE OA (ข้อ 4 ด้านล่าง) | Production, Preview |
| `ADMIN_NOTIFICATION_ENABLED` | `true` (หรือ `false` ถ้าปิดชั่วคราว) | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | `https://everglow-travel-static-web.vercel.app` | Production |

> **สำคัญ:** ไม่ต้องแก้ `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_FB_PIXEL_ID` / `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` เดิม — ยังใช้ได้เหมือนเดิม

---

## 2. Production Branch

ตอนนี้ Vercel ตั้ง Production branch = `deploy` (static export เดิม)

### ทางเลือก A: Deploy ทันที (แนะนำ)
1. **Merge** `backend` → `deploy`
   ```bash
   git checkout deploy
   git merge backend
   git push origin deploy
   ```
2. Vercel จะ rebuild อัตโนมัติ
3. API routes ทำงานทันที (ถ้า ENV ครบ)

### ทางเลือก B: เปลี่ยน Production branch
1. Vercel Dashboard → Project → Settings → Git → Production Branch
2. เปลี่ยนเป็น `backend`
3. Vercel deploy ทันที

### ทางเลือก C: Deploy แยก environment
1. Vercel Dashboard → Project → Settings → Git
2. เพิ่ม preview branch = `backend`
3. Production ยังเป็น `deploy` (เดิม)
4. Preview URL สำหรับทดสอบ backend

> **แนะนำทางเลือก C** เพราะยังไม่ต้องกระทบ production เดิม

---

## 3. สร้าง LINE Official Account

### ขั้นตอนสมัคร
1. ไปที่ https://manager.line.biz/
2. สมัคร LINE Official Account (ฟรี)
3. ตั้งชื่อ: **Everglow Travel**
4. ใส่รูป profile + รายละเอียด

### ขั้นตอนเปิด Messaging API
1. ไปที่ https://developers.line.biz/console/
2. Login ด้วย LINE account เดียวกับที่สมัคร OA
3. สร้าง Provider ใหม่ (ชื่อ: Everglow Travel)
4. สร้าง Channel ใหม่ → Messaging API
5. ใส่ข้อมูล:
   - Channel name: Everglow Travel
   - Description: บริการทัวร์ เอเวอร์โกลว์ โกลบอล
   - Category: Travel
   - Sub-category: Travel Agency
6. เปิดใช้ **Use webhooks** = On
7. ปิด **Auto-reply messages** = Off (ให้ bot ตอบเอง)

### ค่าที่ต้องเก็บจาก LINE Console

ไปที่ **Channel detail** แล้วเก็บค่า:

| ค่า | ตำแหน่ง | ใช้ทำอะไร |
|---|---|---|
| `Channel access token` | Basic settings → Channel access token | สำหรับ send message |
| `Channel secret` | Basic settings → Channel secret | สำหรับ verify signature |

> **สำคัญ:** เก็บ token ไว้ที่เดียว อย่าส่งต่อใคร

---

## 4. หา LINE Admin User ID

Line Admin User ID คือ USER_ID ของคุณเอง ที่ bot จะส่ง push message ไปหา

### วิธีหา

วิธีที่ 1: ผ่าน LINE Console (ง่ายสุด)
1. ไปที่ https://developers.line.biz/console/
2. เลือก Channel ของ Everglow Travel
3. ไปที่ **Messaging API settings**
4. เปิด **Webhook URL** ชี้ไปที่: `https://everglow-travel-static-web.vercel.app/api/line/webhook`
5. ใช้ LINE app แอด bot ของคุณเอง (สแกน QR จาก Channel detail)
6. ส่งข้อความอะไรก็ได้ให้ bot 1 ครั้ง
7. ไปที่ https://developers.line.biz/console/ → Channel → **Messaging API** → **Webhook** → เช็ค log ว่าได้รับ event → จะเห็น userId

วิธีที่ 2: ใช้ LINE Developers API (ถ้ามี token แล้ว)
1. ใช้ token ของ channel เปิด URL นี้ใน browser:
   ```
   https://api.line.me/v2/bot/rich/list
   ```
2. หรือใช้ Postman ส่ง GET ไปที่:
   ```
   https://api.line.me/v2/bot/message/push
   ```
3. userId จะอยู่ในรูปแบบ `Uxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` (33 ตัวอักษร)

### ใส่ค่าใน Vercel

เพิ่ม ENV variable บน Vercel:
```
LINE_ADMIN_USER_ID=Uxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 5. ตั้งค่า Webhook URL

1. ไปที่ https://developers.line.biz/console/
2. เลือก Channel ของ Everglow Travel
3. ไปที่ **Messaging API settings**
4. ตั้ง **Webhook URL**:
   ```
   https://everglow-travel-static-web.vercel.app/api/line/webhook
   ```
5. กด **Verify** → ต้องได้รับ "Success"
6. เปิด **Use webhook** = On
7. ปิด **Auto-reply messages** = Off

---

## 6. ทดสอบ Webhook

### ทดสอบจาก LINE Console
1. ไปที่ Channel → Messaging API settings → Webhook
2. กด **Send test message** → bot ต้องตอบกลับ

### ทดสอบด้วยตัวเอง
1. ใช้ LINE app สแกน QR จาก Channel detail
2. เพิ่ม bot เป็นเพื่อน
3. ส่งข้อความ "สวัสดี" → bot ต้องตอบ
4. ส่งชื่อประเทศ เช่น "ญี่ปุ่น" → bot ต้องแสดงรายการทัวร์

---

## 7. Deploy Checklist

- [ ] Vercel ENV ครบ (4 ตัวข้างบน)
- [ ] Production branch ตั้งถูกต้อง (deploy หรือ backend)
- [ ] LINE OA สร้างเสร็จ + Messaging API เปิด
- [ ] Webhook URL ตั้งถูกต้อง + Verify ผ่าน
- [ ] LINE_ADMIN_USER_ID หาได้แล้ว
- [ ] ส่งข้อความทดสอบแล้ว bot ตอบ
- [ ] Push notification ถึง admin สำเร็จ

---

## ปัญหาที่พบบ่อย

### Bot ไม่ตอบ
- เช็คว่า ENV ครบทั้ง 3 ตัว (ACCESS_TOKEN, SECRET, ADMIN_USER_ID)
- เช็ค webhook URL ถูกต้อง
- เช็ค Vercel deploy log ว่าไม่มี error

### Webhook Verify ไม่ผ่าน
- ต้องตั้ง Webhook URL เป็น HTTPS เท่านั้น
- ต้องเปิด **Use webhook** = On
- ต้องปิด **Auto-reply messages** = Off

### Push ไม่ถึง admin
- เช็ค LINE_ADMIN_USER_ID ถูกต้อง (33 ตัวอักษร, ขึ้นต้นด้วย U)
- ต้องแอด bot เป็นเพื่อนแล้ว

---

## ข้อมูลเพิ่มเติม

- LINE Official Account Manager: https://manager.line.biz/
- LINE Developers Console: https://developers.line.biz/console/
- LINE Messaging API docs: https://developers.line.biz/en/docs/messaging-api/
