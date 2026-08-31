# LINE OA Setup Guide (Everglow Travel)

## ภาพรวม

Bot จะทำ 3 อย่าง:
1. **ตอบอัตโนมัติ** — ลูกค้าพิมพ์ keyword → bot ตอบทัวร์ + ราคา
2. **Push แจ้ง admin** — เมื่อลูกค้าส่งข้อความ → bot ส่งแจ้งเตือนไปหาคุณ
3. **ดึงข้อมูลทัวร์** — ใช้ data ชุดเดียวกับเว็บ (ไม่ต้อง sync)

---

## ขั้นตอน Setup ทั้งหมด

### ขั้นที่ 1: สมัคร LINE Official Account

1. ไปที่ https://manager.line.biz/
2. สมัคร LINE Official Account (ฟรี)
3. ตั้งชื่อ: **Everglow Travel**
4. ใส่รูป profile + รายละเอียดบริษัท

---

### ขั้นที่ 2: สร้าง Channel + เปิด Messaging API

1. ไปที่ https://developers.line.biz/console/
2. Login ด้วย LINE account เดียวกับที่สมัคร OA
3. สร้าง **Provider** ใหม่ (ชื่อ: Everglow Travel)
4. สร้าง **Channel** ใหม่ → เลือก **Messaging API**
5. ใส่ข้อมูล:
   - Channel name: Everglow Travel
   - Description: บริการทัวร์ เอเวอร์โกลว์ โกลบอล
   - Category: Travel
   - Sub-category: Travel Agency
6. เปิดใช้ **Use webhooks** = On
7. ปิด **Auto-reply messages** = Off (ให้ bot ตอบเอง)

---

### ขั้นที่ 3: เก็บ Token

ไปที่ **Channel detail** แล้วเก็บค่า:

| ค่า | ตำแหน่ง | ใช้ทำอะไร |
|---|---|---|
| Channel access token | Basic settings → Channel access token | สำหรับ send message |
| Channel secret | Basic settings → Channel secret | สำหรับ verify signature |

> **สำคัญ:** เก็บ token ไว้ที่เดียว อย่าส่งต่อใคร

---

### ขั้นที่ 4: ตั้งค่า Webhook URL

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

### ขั้นที่ 5: หา LINE Admin User ID

Line Admin User ID คือ USER_ID ของคุณเอง ที่ bot จะส่ง push message ไปหา

#### วิธีหา (ง่ายสุด)

1. ใช้ LINE app สแกน QR จาก Channel detail → เพิ่ม bot เป็นเพื่อน
2. ส่งข้อความอะไรก็ได้ให้ bot 1 ครั้ง
3. ไปที่ https://developers.line.biz/console/ → Channel → Messaging API settings
4. เช็ค **Webhook** log → จะเห็น userId
5. userId อยู่ในรูปแบบ `Uxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` (33 ตัวอักษร)

#### ใส่ค่าใน Vercel

เพิ่ม ENV variable บน Vercel:
```
LINE_ADMIN_USER_ID=Uxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

### ขั้นที่ 6: ตั้งค่า ENV บน Vercel

ไปที่ Vercel Dashboard → Project → Settings → Environment Variables

| Variable | ค่า | Environment |
|---|---|---|
| `LINE_CHANNEL_ACCESS_TOKEN` | จากขั้นที่ 3 | Production, Preview |
| `LINE_CHANNEL_SECRET` | จากขั้นที่ 3 | Production, Preview |
| `LINE_ADMIN_USER_ID` | จากขั้นที่ 5 | Production, Preview |
| `ADMIN_NOTIFICATION_ENABLED` | `true` | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | `https://everglow-travel-static-web.vercel.app` | Production |

---

### ขั้นที่ 7: Deploy

ดูรายละเอียดใน `docs/DEPLOY.md` สำหรับขั้นตอน deploy

---

## Flow การทำงาน

```
ลูกค้า → LINE OA → webhook → /api/line/webhook
   │
   ├─ verify signature (security)
   ├─ detectIntent (อ่าน keyword)
   ├─ createReply (หาทัวร์ + สร้างข้อความ)
   ├─ replyMessage (ตอบลูกค้า)
   └─ pushMessage (แจ้ง admin)
```

---

## ฟังก์ชัน Bot

### auto-reply (ตอบอัตโนมัติ)

| ข้อความลูกค้า | Bot ตอบอะไร |
|---|---|
| สวัสดี / Hello | ข้อความต้อนรับ |
| ญี่ปุ่น / Korea | รายการทัวร์ประเทศนั้น (max 5 ตัว) |
| ราคา / Price | ตัวอย่างราคาทัวร์ (max 5 ตัว) |
| ติดต่อ admin | "กรุณารอสักครู่ค่ะ เจ้าหน้าที่จะติดต่อกลับ" |

### push แจ้ง admin

เมื่อลูกค้าส่งข้อความ bot จะส่งแจ้งเตือนไปหา admin ทันที:
```
[ระบบ] 📩 มีลูกค้าใหม่ (Uxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx)
ข้อความ: ญี่ปุ่น
```

---

## Keyword ที่รองรับ

### greeting
- สวัสดี, hello, hi, หวัดดี

### searchTour
- ชื่อประเทศ (ญี่ปุ่น, เกาหลี, ฮ่องกง, ฯลฯ)
- ชื่อเมือง (โอซาก้า, โซล, ฯลฯ)
- ชื่อทัวร์ (ID ทัวร์)

### priceSearch
- ราคา, price, กี่บาท, เท่าไหร่, งบ, budget

### contactAdmin
- ติดต่อ, contact, แอดมิน, admin, คุยกับคน, เจ้าหน้าที่

---

## Testing

### ทดสอบจาก LINE Console
1. ไปที่ Channel → Messaging API settings → Webhook
2. กด **Send test message** → bot ต้องตอบกลับ

### ทดสอบด้วยตัวเอง
1. ใช้ LINE app สแกน QR จาก Channel detail
2. เพิ่ม bot เป็นเพื่อน
3. ส่งข้อความ "สวัสดี" → bot ต้องตอบ
4. ส่งชื่อประเทศ เช่น "ญี่ปุ่น" → bot ต้องแสดงรายการทัวร์

---

## ปัญหาที่พบบ่อย

### Bot ไม่ตอบ
- เช็ค ENV ครบทั้ง 3 ตัว (ACCESS_TOKEN, SECRET, ADMIN_USER_ID)
- เช็ค webhook URL ถูกต้อง
- เช็ค Vercel deploy log ว่าไม่มี error

### Webhook Verify ไม่ผ่าน
- ต้องตั้ง Webhook URL เป็น HTTPS เท่านั้น
- ต้องเปิด Use webhook = On
- ต้องปิด Auto-reply messages = Off

### Push ไม่ถึง admin
- เช็ค LINE_ADMIN_USER_ID ถูกต้อง (33 ตัวอักษร, ขึ้นต้นด้วย U)
- ต้องแอด bot เป็นเพื่อนแล้ว

---

## ข้อมูลเพิ่มเติม

- LINE Official Account Manager: https://manager.line.biz/
- LINE Developers Console: https://developers.line.biz/console/
- LINE Messaging API docs: https://developers.line.biz/en/docs/messaging-api/
