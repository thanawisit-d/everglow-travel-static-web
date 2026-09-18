# Everglow Travel

เว็บไซต์ทัวร์ 2 ภาษา (TH/EN) พร้อม LINE Official Account Bot สำหรับค้นหาทัวร์และตอบลูกค้าอัตโนมัติ สร้างด้วย **Next.js 16 (App Router)** และ **LINE Messaging API**

**Current Status:** Sprint **6.0 – Production Polish & Data QA**

---

## Overview

Everglow Travel มี 3 ส่วนหลัก

* 🌐 **Website** — รายการทัวร์, รายละเอียดทัวร์, รีวิว, เกี่ยวกับ, ติดต่อ (`/th`, `/en`)
* 💬 **LINE Bot** — ค้นหาทัวร์จากข้อความ (ประเทศ / เดือน / งบ / โปรโมชัน), Quick Reply, Rich Menu, Admin Notification
* 📦 **Data Layer** — ใช้ JSON ทั้งหมด (ไม่มี Database หรือ CMS)

**Single Source of Truth:** `src/data/tours-th.json`

---

## Tech Stack

| Technology            | Usage                        |
| --------------------- | ---------------------------- |
| Next.js 16 + React 19 | Website & API Routes         |
| TypeScript            | Backend logic / shared types |
| JavaScript            | Frontend components          |
| Tailwind CSS v4       | Styling                      |
| `@line/bot-sdk`       | LINE Messaging API           |
| Vercel                | Deployment                   |

---

## Project Structure

```text
src/
├── app/
│   ├── [locale]/             # TH / EN pages
│   └── api/
│       ├── tours/            # Tour API
│       └── line/
│           ├── webhook/      # LINE webhook
│           └── broadcast/     # Broadcast API
│
├── lib/
│   ├── line-reply.ts         # Intent + Reply Builder
│   ├── search-filters.ts     # Search Engine
│   ├── tours-data.ts         # Tour data access
│   ├── line-flex.ts          # Flex Carousel Builder
│   ├── line-broadcast.ts     # Broadcast payload builder
│   ├── line.ts               # LINE API wrapper
│   ├── line-quick-reply.ts
│   ├── logger.ts
│   └── env.ts
│
├── types/                    # Shared types
├── data/                     # tours-th.json, tours-en.json, reviews.json
├── components/               # UI Components
└── utils/


public/
├── images/
└── pdf/
```

### Important Files

| File                 | Responsibility                   |
| -------------------- | -------------------------------- |
| `line-reply.ts`      | Detect intent และสร้างข้อความตอบ |
| `search-filters.ts`  | Natural language search engine   |
| `tours-data.ts`      | โหลดและกรองข้อมูลทัวร์จาก JSON   |
| `line-flex.ts`       | สร้าง Flex Carousel              |
| `webhook/route.ts`   | รับข้อความจาก LINE OA            |
| `broadcast/route.ts` | Broadcast + Preview API          |

---

## Installation

```bash
npm install

cp .env.example .env.local

npm run dev
```

เปิดเว็บไซต์ที่

* `http://localhost:3000/th`
* `http://localhost:3000/en`

> LINE Bot จะทำงานเมื่อกำหนด Environment Variables ครบ

---

## Environment Variables

สร้าง `.env.local`

```env
LINE_CHANNEL_SECRET=
LINE_CHANNEL_ACCESS_TOKEN=
LINE_ADMIN_USER_ID=

ADMIN_NOTIFICATION_ENABLED=false
BROADCAST_ENABLED=false

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`.env.local` ถูก ignore โดย Git — **ห้าม commit**

---

## Available Scripts

```bash
npm run dev        # Development server
npm run build      # Production build
npm start          # Run production build
npm run lint       # ESLint
npx tsc --noEmit   # Type check
```

---

## LINE OA Setup

1. สร้าง LINE Official Account และ Messaging API Channel
2. เปิด **Use Webhooks**
3. ปิด **Auto Reply Messages**
4. ตั้ง Webhook URL

```text
https://<your-domain>/api/line/webhook
```

5. เพิ่มค่าเหล่านี้ลง `.env.local`

* `LINE_CHANNEL_SECRET`
* `LINE_CHANNEL_ACCESS_TOKEN`
* `LINE_ADMIN_USER_ID`

---

## LINE Bot Flow

```text
LINE User
    │
    ▼
Webhook (/api/line/webhook)
    │
    ▼
detectIntent()
    │
    ▼
extractSearchFilters()
    │
    ▼
filterTours()
    │
    ▼
buildReply()
    │
    ▼
Flex Carousel + Quick Reply
    │
    └── Admin Notification (booking / inquiry / contact)
```

---

## Search Engine

รองรับข้อความธรรมชาติ เช่น

| Example               | Filters                     |
| --------------------- | --------------------------- |
| ญี่ปุ่น ตุลาคม        | Country + Month             |
| งบ30000               | Max Price                   |
| เกาหลี มีนาคม 5 วัน   | Country + Month + Duration  |
| โปรญี่ปุ่นเดือนเมษายน | Promotion + Country + Month |


Search ใช้ `extractSearchFilters()` → `filterTours()` เพียงชุดเดียว

---

## Broadcast API

### Preview (ไม่ส่งจริง)

```bash
GET /api/line/broadcast?preview=true&type=monthly
```

### Send Broadcast

```bash
POST /api/line/broadcast
{
  "type": "monthly"
}
```

ต้องเปิด

```env
BROADCAST_ENABLED=true
```

รองรับ `monthly` และ `promotion`

---

## Deployment (Vercel)

Production ใช้ **branch `deploy`**

Workflow

```bash
git checkout deploy
git merge backend
git push origin deploy

git checkout backend
git push origin backend
```

Vercel จะ Deploy อัตโนมัติเมื่อ `deploy` ถูก Push

---

## Git Workflow

| Branch      | Purpose                    |
| ----------- | -------------------------- |
| `backend`   | Development branch         |
| `deploy`    | Production branch (Vercel) |
| `feature/*` | Feature / Sprint branches  |
| `main`      | Baseline (ไม่ใช้พัฒนา)     |

ก่อนเปิด Pull Request ให้รัน

```bash
npm run lint
npx tsc --noEmit
npm run build
```

---

## Testing Checklist

### Website

* Home (`/th`, `/en`)
* Search
* Tour Detail
* Reviews / Contact / About

### LINE Bot

* Greeting
* Country Search
* Month Search
* Promotion Search
* Booking
* Admin Notification
* Broadcast Preview

---

## Notes for Contributors

* **ไม่มี Database** — ทุกข้อมูลอยู่ใน `src/data/*.json`
* `tours-th.json` คือข้อมูลหลักของระบบ
* LINE Bot และ Website ใช้ข้อมูลชุดเดียวกัน
* ห้าม commit `.env.local` หรือ Secret ใด ๆ