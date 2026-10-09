# Everglow Travel — เว็บไซต์ทัวร์ 2 ภาษา + LINE Bot


เว็บไซต์บริษัท **Everglow Travel** แบบ 2 ภาษา (ไทย / อังกฤษ) พร้อม LINE Official Account Bot
สำหรับค้นหาทัวร์และตอบลูกค้าอัตโนมัติ ข้อมูลทั้งหมดเป็น **ไฟล์ JSON ล้วน ไม่มี Database และไม่มี CMS**

---

## สารบัญ

1. [ภาพรวมระบบ](#1-ภาพรวมระบบ)
2. [Tech Stack](#2-tech-stack)
3. [สิ่งที่ต้องมีในเครื่อง](#3-สิ่งที่ต้องมีในเครื่อง)
4. [เริ่มต้นใช้งาน](#4-เริ่มต้นใช้งาน)
5. [Environment Variables](#5-environment-variables)
6. [คำสั่งที่ใช้บ่อย (Scripts)](#6-คำสั่งที่ใช้บ่อย-scripts)
7. [โครงสร้างโปรเจกต์](#7-โครงสร้างโปรเจกต์)
8. [โครงสร้างข้อมูล (Data Model) — อ่านให้ครบก่อนแก้](#8-โครงสร้างข้อมูล-data-model--อ่านให้ครบก่อนแก้)
9. [Routes & Pages](#9-routes--pages)
10. [API Routes](#10-api-routes)
11. [LINE Bot](#11-line-bot)
12. [Git LFS (ไฟล์ PDF) — สำคัญมาก](#12-git-lfs-ไฟล์-pdf--สำคัญมาก)
13. [การ Deploy](#13-การ-deploy)
14. [สถานะงาน & หมายเหตุส่งต่อ](#14-สถานะงาน--หมายเหตุส่งต่อ)
15. [แนวทางการเขียนโค้ด](#15-แนวทางการเขียนโค้ด)
16. [แก้ปัญหาที่พบบ่อย](#16-แก้ปัญหาที่พบบ่อย)

---

## 1. ภาพรวมระบบ

ระบบมี 3 ส่วนหลัก

- **Website** — หน้าทัวร์ในประเทศ (domestic), ทัวร์ต่างประเทศ (outbound), รายละเอียดทัวร์, รีวิว, เกี่ยวกับ, ติดต่อ (`/th`, `/en`)
- **LINE Bot** — ค้นหาทัวร์จากข้อความ (ประเทศ / เดือน / งบประมาณ / โปรโมชัน), Quick Reply, Flex Carousel
- **Data Layer** — ไฟล์ JSON ใน `src/data/` (ไม่มีฐานข้อมูล)

**ตัวเลขข้อมูลปัจจุบัน**

| ข้อมูล | ไฟล์ | จำนวน |
| --- | --- | --- |
| ทัวร์ไทย | `src/data/tours-th.json` | 75 (domestic 33 + outbound 42) |
| ทัวร์อังกฤษ | `src/data/tours-en.json` | 14 (domestic ทั้งหมด) |
| รีวิวไทย | `src/data/reviews-th.json` | 8 |
| รีวิวอังกฤษ | `src/data/reviews-en.json` | 7 (ไม่มี outbound) |
| ความประทับใจ (แชท) | `src/data/testimonials.json` | 9 |
| ข้อความ UI 2 ภาษา | `src/data/site-config.json` | th / en |

---

## 2. Tech Stack

| เทคโนโลยี | ใช้ทำอะไร |
| --- | --- |
| Next.js 16 (App Router) + React 19 | เว็บไซต์ + API Routes |
| TypeScript | logic ฝั่ง backend / shared types (`src/lib`, `src/types`) |
| JavaScript | UI components (`src/components`, หน้าเว็บ) |
| Tailwind CSS v4 + CSS ใน `src/styles` | Styling |
| `@line/bot-sdk` | LINE Messaging API |
| `lucide-react`, `choices.js` | ไอคอน และ dropdown ค้นหา |
| Git LFS | เก็บไฟล์ PDF (ดูหัวข้อ 12) |

> หมายเหตุ: TS กับ JS ใช้ผสมกัน — `.ts` สำหรับ logic, `.js` สำหรับ component/หน้าเว็บ

---

## 3. สิ่งที่ต้องมีในเครื่อง

- **Node.js 20+** (พัฒนาบน Node 24) และ npm 11+
- **Git**
- **Git LFS** — *จำเป็น* เพราะไฟล์ PDF เก็บผ่าน LFS (ถ้าไม่มี ไฟล์จะกลายเป็น pointer ขนาด ~130 ไบต์)

```bash
git lfs install
```

---

## 4. เริ่มต้นใช้งาน

```bash
# 1) clone
git clone https://github.com/thanawisit-d/everglow-travel-static-web.git
cd everglow-travel-static-web

# 2) ติดตั้ง Git LFS แล้วดึงไฟล์ PDF จริง (ถ้าลืมข้อนี้ PDF จะเปิดไม่ได้)
git lfs install
git lfs pull

# 3) ติดตั้ง dependencies
npm install

# 4) ตั้งค่า environment
#    (Windows)  copy .env.example .env.local
cp .env.example .env.local
#    แล้วเปิด .env.local ใส่ค่า LINE_CHANNEL_SECRET / LINE_CHANNEL_ACCESS_TOKEN

# 5) รัน dev server
npm run dev
```

เปิดเว็บ

- หน้าเลือกภาษา (landing): http://localhost:3000

---

## 5. Environment Variables

คัดลอกจาก `.env.example` ไปเป็น `.env.local` (ไฟล์นี้ถูก gitignore **ห้าม commit secrets**)

| ตัวแปร | จำเป็น | ใช้ที่ไหน | คำอธิบาย |
| --- | --- | --- | --- |
| `LINE_CHANNEL_SECRET` | เฉพาะเมื่อใช้ LINE bot | API routes (server) | ตรวจ signature ของ webhook |
| `LINE_CHANNEL_ACCESS_TOKEN` | เฉพาะเมื่อใช้ LINE bot | API routes (server) | ส่งข้อความตอบกลับ LINE |
| `NEXT_PUBLIC_SITE_URL` | แนะนำ | SEO / sitemap / metadata | URL จริงของเว็บ (โดเมนที่จดกับ Hostinger, ไม่มี trailing slash) |

- **เว็บรันได้โดยไม่ต้องตั้ง env เลย** — จำเป็นเฉพาะ `LINE_*` เมื่อจะใช้บอท
- ค่า `LINE_*` ถูกอ่านผ่าน `src/lib/env.ts` และจะ throw ถ้าค่าไม่ถูกตั้ง **เมื่อมีการเรียกใช้ webhook** (เว็บไซต์ยังรันได้แม้ไม่มี)
- `NEXT_PUBLIC_SITE_URL` มีค่า fallback ในโค้ด แต่ควรตั้งให้เป็นโดเมนจริงเพื่อ SEO ที่ถูกต้อง
- `NEXT_PUBLIC_*` ถูกส่งเข้า app ผ่าน `next.config.mjs`

---

## 6. คำสั่งที่ใช้บ่อย (Scripts)

```bash
npm run dev        # รัน development server
npm run build      # production build
npm start          # รัน production build (ต้อง build ก่อน)
npm run lint       # ESLint
npx tsc --noEmit   # ตรวจ type
```

**ก่อน deliver ทุกครั้ง ควรรันให้ผ่านทั้ง 3 ตัว**

```bash
npm run lint && npx tsc --noEmit && npm run build
```

---

## 7. โครงสร้างโปรเจกต์

```text
src/
├── app/
│   ├── (landing)/            # หน้า "/" เลือกภาษา (TH/EN)
│   ├── [locale]/             # หน้าเว็บ TH / EN
│   │   ├── page.js           # หน้าแรก
│   │   ├── domestic/         # รายการทัวร์ในประเทศ (+ client search)
│   │   ├── outbound/         # รายการทัวร์ต่างประเทศ
│   │   ├── tours/[id]/       # รายละเอียดทัวร์
│   │   ├── reviews/          # รีวิว (list + [id])
│   │   ├── about/ contact/ privacy/
│   │   └── layout.js
│   ├── api/
│   │   ├── health/           # GET /api/health
│   │   ├── tours/            # GET /api/tours (ค้นหา/กรอง)
│   │   └── line/webhook/     # POST webhook ของ LINE
│   ├── layout.js  error.js  loading.js  not-found.js
│   ├── robots.js  sitemap.js
│   └── globals.css
│
├── components/               # UI components (ดูรายการด้านล่าง)
├── data/                     # JSON ทั้งหมด (tours, reviews, testimonials, site-config)
├── lib/                      # logic + helper
│   ├── line-reply.ts         # ตรวจ intent + สร้างข้อความตอบ
│   ├── search-filters.ts     # แปลข้อความ → เงื่อนไขค้นหา
│   ├── tours-data.ts         # โหลด/กรองข้อมูลทัวร์
│   ├── line-flex.ts          # สร้าง Flex Carousel
│   ├── line.ts               # wrapper ของ LINE API
│   ├── line-config.ts        # ข้อความต้อนรับ/ค่า default
│   ├── line-quick-reply.ts   # ปุ่ม Quick Reply
│   ├── i18n.js               # map แปลชื่อประเทศ/จังหวัด + displayField
│   ├── assets.js             # assetPath() เติม "/" หน้า path
│   ├── pricing.js            # formatPrice()
│   ├── env.ts logger.ts tracking.js dateFilter.js ...
│   └── useToursFilter.js     # hook กรองทัวร์ของหน้าฝั่ง client
├── styles/                   # ไฟล์ CSS แยกตามส่วน
├── types/                    # api.ts tour.ts line.ts intent.ts
└── utils/price.ts

public/                       # รูปภาพ, PDF, ไอคอน ฯลฯ
```

**Component สำคัญ**

| Component | หน้าที่ |
| --- | --- |
| `TourCard.js` | การ์ดทัวร์ในหน้ารายการ |
| `TourDetail.js` | หน้ารายละเอียดทัวร์ (ชื่อ, จุดหมาย, งวดเดินทาง, ปุ่มติดต่อ, PDF) |
| `TourProgram.js` | แสดงกำหนดการ (itinerary) แบบ accordion |
| `ReviewSection.js` | ส่วนรีวิว (list + หน้า standalone) |
| `ReviewDetail.js` | หน้ารายละเอียดรีวิว |
| `FilterSidebar.js` / `ActiveFilters.js` / `Pagination.js` | ระบบกรอง/แบ่งหน้า |
| `Header.js` / `Footer.js` / `HeroSection.js` / `Contact.js` | ส่วนโครงหน้าเว็บ |

---

## 8. โครงสร้างข้อมูล (Data Model) 
### 8.1 หลักการทำ 2 ภาษา (สำคัญที่สุด)

โปรเจกต์นี้ใช้วิธี **แยกไฟล์ตามภาษา ไม่ใช้ field ต่อท้าย `_en`**

- `tours-th.json` = แคตตาล็อกไทย
- `tours-en.json` = แคตตาล็อกอังกฤษ
- `reviews-th.json` / `reviews-en.json` = รีวิว 2 ภาษา
- `site-config.json` = มี object `th` และ `en` แยกอยู่ภายในไฟล์เดียว

> ทั้งสองแคตตาล็อก **ไม่ใช่คำแปลของกันและกัน** — คนละกลุ่มลูกค้า (ดูหัวข้อ 3 ภาพรวม)
> เพิ่ม/ลบ/แก้ทัวร์ในแต่ละภาษาได้อย่างอิสระ โดยใช้ `id` เป็นตัวอ้างอิง

**ข้อควรระวัง:** อย่าใส่ field `*_en` กลับเข้าไปในไฟล์ข้อมูล — โครงสร้างถูกปรับให้เรียบร้อยแล้ว
(ในอดีตเคยมี `desc_en`, `shortDesc_en`, `duration_en`, `periodText_en`, `name_en`, `title_en`,
`time_en`, `description_en` ปนอยู่ และถูกลบออกทั้งหมดแล้ว)

### 8.2 ทัวร์ — `tours-th.json` / `tours-en.json`

รูปทรงข้อมูล (โมเดลเดียวกันทั้ง 2 ภาษา)

```jsonc
{
  "id": "EGT1D-02",              // รหัสทัวร์ (ต้องไม่ซ้ำ, ใช้เป็น URL)
  "type": "domestic",            // "domestic" | "outbound"
  "province": "ราชบุรี",          // เฉพาะ domestic
  "country": "ญี่ปุ่น",           // เฉพาะ outbound (string หรือ array)
  "city": "โตเกียว",              // เฉพาะ outbound
  "startMonth": "เมษายน",         // เฉพาะ outbound
  "endMonth": "มิถุนายน",         // เฉพาะ outbound
  "periodText": "เม.ย. - มิ.ย. 2569", // ช่วงเวลาเดินทาง (แสดงผล)
  "image": "banner1day/Banner EGT1D-02.png", // path เทียบจาก public/ (ไม่ต้องมี "/" นำหน้า)
  "price": "1,999",             // ราคาเริ่มต้น (string)
  "duration": "1 วัน",           // ระยะเวลา (ใช้แยก 1 วัน / หลายวัน)
  "airline": "TG",              // เฉพาะ outbound
  "desc": "ทัวร์ราชบุรี ...",      // ชื่อเรื่องสั้น (แสดงเป็นหัวข้อ)
  "shortDesc": "เที่ยวถ้ำเขาบิน ...", // รายละเอียด/จุดหมาย (แสดงเป็นคำบรรยาย)
  "pdf": "filepdf_1day/EGT1D-02.pdf",  // path ไฟล์ PDF (เก็บใน LFS)
  "transport": { "name": "รถ VIP Van 10 ที่นั่ง", "icon": "icons/van.png" },
  "itinerary": [                 // กำหนดการ (ไม่บังคับ)
    {
      "day": 1,
      "title": "กรุงเทพฯ • ราชบุรี",
      "items": [
        { "time": "07:00", "description": "นัดหมายที่กรุงเทพฯ ..." }
      ]
    }
  ]
}
```

> **โมเดลสำคัญ:** `desc` = ชื่อเรื่อง, `shortDesc` = รายละเอียด
> (เดิมเคยมีโมเดลเก่าที่ `desc` รวมชื่อ+รายละเอียดในสตริงเดียว — ตอนนี้เลิกใช้แล้ว)

### 8.3 วิธีเพิ่ม/แก้ทัวร์

1. แก้ไฟล์ `tours-th.json` (และ/หรือ `tours-en.json`) — ใส่ `id` ให้ไม่ซ้ำ
2. วางรูปแบนเนอร์ใน `public/banner.../` และ PDF ใน `public/filepdf.../`
   - path ที่ใส่ใน JSON คือ relative จาก `public/` เช่น `"banner1day/Banner EGT1D-XX.png"`
   - **PDF จะถูกเก็บใน Git LFS อัตโนมัติ** (ตามกฎ `*.pdf` ใน `.gitattributes`)
3. รัน `npm run build` เพื่อยืนยันว่า generate หน้าทัวร์ใหม่ได้
4. ถ้าเพิ่มทัวร์ EN ให้ดูว่า `locale === 'en'` หน้า domestic/outbound จะแสดงให้เอง

### 8.4 ทัวร์ยอดนิยม & โปรแกรมประจำเดือน (Popular / Monthly)

หน้าแรก (`/{locale}`) มีการ์ด 2 ส่วน: **ทัวร์ยอดนิยม** และ **โปรแกรมประจำเดือน**
ส่วน "ยอดนิยม" กำหนดด้วย field ในไฟล์ทัวร์แต่ละภาษา

```jsonc
{
  "id": "EGT1D-02",
  "popular": true,       // true = เข้าไปแสดงในส่วน "ทัวร์ยอดนิยม"
  "popularOrder": 1      // ลำดับการแสดง (น้อย = อยู่หน้าสุด; ไม่ใส่ = 999)
}
```

- โค้ดดึงผลใน `getPopularTours()` (`src/lib/tours-data.ts:18`) — เอาเฉพาะทัวร์ที่
  `popular === true` เรียงตาม `popularOrder` แล้วตัดเหลือไม่เกิน **5** รายการ
- ถ้า**ไม่มีทัวร์รายการไหนตั้ง `popular`** เลย → ส่วนนี้จะ fallback ไปใช้ทัวร์ชุดแรกแทน
  (หน้าแรกใช้ `toursData.slice(0, 6)`) เพื่อไม่ให้ส่วนว่าง
- badge บนการ์ดดึงข้อความจาก `site-config.json` → `badgePopular`
  (`โปรแกรมยอดนิยม` / `HOT DEAL`)
- ตั้งค่าแยกกันได้ 2 ภาษา (แก้ใน `tours-th.json` และ/หรือ `tours-en.json` ตามต้องการ)
- ถ้าแสดงมากกว่า 4 รายการ การ์ดจะกลายเป็นสไลเดอร์เลื่อนอัตโนมัติ (ดู `TourGrid.js`)

> ส่วน **โปรแกรมประจำเดือน** เป็นคนละระบบ — เลือกจากเดือนเริ่มเดินทางโดยอัตโนมัติ
> (ดู `src/lib/monthly-selector.ts`) ไม่ต้องตั้ง field เอง
>
> ปัจจุบันไฟล์ทัวร์ทั้ง `tours-th.json` / `tours-en.json` **ยังไม่มีรายการไหนตั้ง `popular`**
> หน้าแรกจึงยังแสดงผลแบบ fallback อยู่ — ถ้าต้องการกำหนดเอง ให้ใส่ `popular: true` ตามตัวอย่างด้านบน

### 8.5 รีวิว — `reviews-th.json` / `reviews-en.json`

```jsonc
{
  "id": "domestic-khao-yai-1d",     // ใช้เป็น URL: /{locale}/reviews/{id}
  "category": "domestic",           // "domestic" | "outbound" (outbound = ไทยเท่านั้น)
  "image": "review_page/reviews_gallery/1D/เขาใหญ่/เขาใหญ่_01.jpeg", // รูปปก
  "tag": "1 DAY TRIP : เขาใหญ่",     // มี ":" คั่น — ส่วนหลัง ":" ใช้เป็นชื่อที่แสดง
  "text": "ภาพบรรยากาศความประทับใจจากทริป..."
}
```

- แกลเลอรีรูปของรีวิว หาได้จาก mapping ใน `ReviewSection.js` / `ReviewDetail.js`
  (`REVIEW_GALLERY_FOLDERS`) และไฟล์จริงอยู่ที่
  `public/review_page/reviews_gallery/<โฟลเดอร์>/<ชื่อ>_01..05.(jpeg|jpg|png)`
- เพิ่มรีวิว EN: เพิ่มรายการใน `reviews-en.json` ด้วย `id` เดียวกันเพื่อให้มี hreflang ทั้งคู่
- `outbound` เป็นไทยเท่านั้น (ไม่มีใน `reviews-en.json`)

### 8.6 ความประทับใจ (แชท) — `testimonials.json`

```jsonc
{ "image": "review_page/reviews_chat/reviews_chat_01.jpg", "trip": "สระบุรี", "text": "..." }
```

- แสดงเป็น **รูปภาพ** ในแท็บ "ความประทับใจ" (`ReviewSection`)
- บางรายการมี `reviewId` เพื่อผูกกับรีวิวและแสดงในหน้ารายละเอียดรีวิว

### 8.7 ข้อความ UI — `site-config.json`

- มี object `th` และ `en` (คีย์ตรงกัน) สำหรับข้อความทุกหน้าจอ
- มี `countryGroups` / `domesticGroups` (เมนู/ตัวเลือกจุดหมาย) ที่มีทั้ง `label` และ `labelEn`
- ค่า default เมื่อไม่มีก็จะ fallback เป็น `config.th`

> หมายเหตุ: `site-config.json` ยังรวม 2 ภาษาไว้ไฟล์เดียว (โครงสร้างสะอาดพอแล้ว)
> ถ้าภายหลังต้องการแยกเป็น `site-config-th/en.json` ก็ทำได้ แต่ต้องแก้ import ในหลายไฟล์

---

## 9. Routes & Pages

| Route | คำอธิบาย |
| --- | --- |
| `/` | หน้าเลือกภาษา (landing) |
| `/{locale}` | หน้าแรก (`th` / `en`) |
| `/{locale}/domestic` | รายการทัวร์ในประเทศ |
| `/{locale}/outbound` | รายการทัวร์ต่างประเทศ |
| `/{locale}/tours/{id}` | รายละเอียดทัวร์ (generate แบบ static) |
| `/{locale}/reviews` | หน้ารวมรีวิว |
| `/{locale}/reviews/{id}` | รายละเอียดรีวิว |
| `/{locale}/about` `/{locale}/contact` `/{locale}/privacy` | หน้าข้อมูลบริษัท |
| `/sitemap.xml`, `/robots.txt` | SEO (สร้างจากข้อมูลจริง) |

- หน้า `tours/[id]` และ `reviews/[id]` ใช้ `dynamicParams = false` → สร้างเฉพาะ `id` ที่มีใน JSON
- `/{locale}/reviews/{id}` (outbound) มีเฉพาะภาษาไทย

---

## 10. API Routes

| Endpoint | Method | คำอธิบาย |
| --- | --- | --- |
| `/api/health` | GET | health check → `{ status: 'ok', version: '1.0.0' }` |
| `/api/tours` | GET | ค้นหา/กรองทัวร์: `?locale=en&q=&country=&minPrice=&maxPrice=` |
| `/api/line/webhook` | POST | รับ event จาก LINE (ตรวจ signature, ตอบกลับ) |

---

## 11. LINE Bot

- **Webhook URL:** `https://<โดเมนของเว็บ>/api/line/webhook`
  ตั้งค่าที่ LINE Developers Console → Messaging API → Webhook URL
  แล้วกด **Verify** และเปิด **Use webhook**
- **โค้ดที่เกี่ยวข้อง:** `src/lib/line-reply.ts` (ตรวจ intent + สร้างคำตอบ),
  `src/lib/search-filters.ts` (แปลงข้อความเป็นเงื่อนไขค้นหา),
  `src/lib/line-flex.ts` (Flex Carousel), `src/lib/line.ts` (เรียก LINE API)
- **ค่า default:** ภาษาไทย (`lineConfig.defaultLocale = 'th'`) และข้อความต้อนรับอยู่ใน `src/lib/line-config.ts`
- **ฟีเจอร์ที่เคยมีแต่ถูกลบออกโดยเจตนา:** ระบบ "แจ้งเตือนแอดมิน / broadcast"
  (`src/lib/line-broadcast.ts` และ `src/app/api/line/broadcast/route.ts`)
  — ปัจจุบันมีแค่การ **ตอบกลับผู้ใช้** เท่านั้น ถ้าต้องการ broadcast ให้เพิ่มกลับใหม่

---

## 12. Git LFS (ไฟล์ PDF) — สำคัญมาก

ไฟล์ PDF ทั้งหมดถูกเก็บผ่าน **Git LFS** (กำหนดใน `.gitattributes`)

```gitattributes
public/filepdf_1day/*.pdf filter=lfs diff=lfs merge=lfs -text
*.pdf filter=lfs diff=lfs merge=lfs -text
```

**สิ่งที่ต้องรู้**

- ถ้าฝั่ง host/ผู้ clone ไม่รองรับ LFS ไฟล์ PDF จะกลายเป็นข้อความ pointer ขนาด ~130 ไบต์ และเปิดไม่ได้
- หลัง `git clone` ต้อง `git lfs pull` เสมอ
- **โควตา Git LFS ของ GitHub Free** = storage 10 GiB + bandwidth 10 GiB/เดือน
  ปัจจุบันใช้ไปราว **1.7 GB** (tours + EN assets) — อยู่ในโควตา
- ค่าใช้จ่าย LFS ผูกกับ **เจ้าของ repo** (ไม่ใช่คนที่ push)
- ก่อน push PDF จำนวนมาก ให้เช็คโควตา/ตั้ง budget ที่ GitHub Billing เพื่อกันค่าใช้จ่ายเกิน

**การ deploy บน Hostinger**

- ต้องตั้งค่าให้ host รองรับ Git LFS (ถ้าไม่ ไฟล์ PDF จะกลายเป็น pointer) หรือดึงไฟล์ LFS ให้ครบก่อน deploy
- โปรเจกต์เป็น **Next.js** ที่มี API Route (LINE webhook) → ต้องรันบน environment ที่รัน Node ได้
  การ deploy แบบ static/PHP ทั่วไปจะรัน API ไม่ได้ (ต้องใช้แพลนที่รัน Node เช่น VPS/Cloud)

---

## 13. การ Deploy (Hostinger)

- โฮสต์ปัจจุบัน: **Hostinger** (โดเมนจดกับ Hostinger) และอ่านค่า `NEXT_PUBLIC_SITE_URL`
- โปรเจกต์เป็น Next.js ที่มี API Route → ต้องรันบนแพลนที่รองรับ **Node** (เช่น VPS/Cloud) ไม่ใช่ shared hosting แบบ static/PHP
- ขั้นตอนย่อ: ตั้ง environment variables ให้ครบ (`NEXT_PUBLIC_SITE_URL`, ถ้าใช้บอทก็ `LINE_*`)
  แล้ว deploy จาก branch `main`
- ตรวจว่า host ดึงไฟล์ **Git LFS** ได้ครบ (ดูหัวข้อ 12) เป็นพิเศษ
- เมื่อ deploy เสร็จ ให้ตั้ง LINE Webhook URL ให้ชี้ไปโดเมนใหม่

---

## 14. สถานะงาน


### ไฟล์/asset ที่อาจไม่ได้ถูกใช้ (ควรตรวจก่อนลบ)

- `public/reviews_pic/` (7 รูป .png) — **ไม่พบโค้ดอ้างอิง** (อาจเป็น asset เก่าจาก branch)
- `public/assets/images/social/whatsapp.webp` — ไม่มีโค้ดใช้ (โค้ดใช้ `whatsapp.png` แทน)

### ประเด็นค้าง / ข้อควรระวัง

- `tours-en.json` มี 14 ทัวร์ — เคยมี 23 ตัวในเวอร์ชันก่อนหน้า ควรยืนยันกับเจ้าของว่ารายการ EN ที่ต้องการคือชุดใด
- มีจุดแปลฝังในโค้ด (`isEn ? ... : ...`) ราว 80 จุดใน 18 ไฟล์ — ถ้าจะเพิ่มภาษาที่ 3 ต้องรื้อส่วนนี้
- `site-config.json` ยังรวม 2 ภาษาไว้ไฟล์เดียว (จะแยกก็ได้ ไม่แยกก็ทำงานปกติ)
- รูปแบนเนอร์ EN มีขนาดใหญ่ (บางไฟล์ 6–14 MB) — ถ้าเป็นห่วงโหลดช้า/โควตา ควรบีบอัดก่อน

### ขั้นถัดไปที่แนะนำ

1. พิจารณาบีบอัดรูป/PDF (มีผลกับความเร็วและโควตา LFS)

---

## 15. แนวทางการเขียนโค้ด

- Component/หน้าเว็บเขียนเป็น **JavaScript** (`.js`), logic เป็น **TypeScript** (`.ts`)
- ใช้ alias `@/` ชี้ไปที่ `src/` (ดู `jsconfig.json`)
- path ของ asset ใน JSON **ไม่ต้องมี `/` นำหน้า** ใช้ `assetPath()` เติมให้
- ก่อน commit ทุกครั้งให้รัน `npm run lint && npx tsc --noEmit && npm run build`
- **ห้าม commit** `.env.local` หรือไฟล์ที่มี secret
- time/period ให้ดูรูปแบบที่ใช้อยู่เดิมในไฟล์ข้อมูลเพื่อความสอดคล้อง

---

## 16. แก้ปัญหาที่พบบ่อย

| อาการ | สาเหตุ/วิธีแก้ |
| --- | --- |
| PDF เปิดไม่ได้ / ไฟล์เล็กผิดปกติ (~130 B) | ยังไม่ได้ `git lfs pull` หรือโฮสต์ไม่รองรับ LFS |
| `/th/tours/...` หรือ `/en/tours/...` ขึ้น 404 | ไม่มี `id` นั้นใน JSON ของภาษานั้น (แต่ละภาษามีแคตตาล็อกแยกกัน) |
| LINE webhook ตอบ 500 | ไม่ได้ตั้ง `LINE_CHANNEL_SECRET` / `LINE_CHANNEL_ACCESS_TOKEN` |
| ข้อมูลที่แก้ไม่ขึ้น | ข้อมูลถูก generate ตอน `build` — ต้อง restart dev หรือ `npm run build` ใหม่ |
| build ล้มเพราะ route เยอะ/ข้อมูลผิด | ตรวจ `id` ซ้ำ หรือ path รูป/PDF ที่ไม่ถูกต้อง |

---