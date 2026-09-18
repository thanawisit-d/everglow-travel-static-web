# Everglow Travel

เว็บไซต์ทัวร์ 2 ภาษา (TH/EN) พร้อม LINE Official Account Bot สำหรับค้นหาทัวร์และตอบลูกค้าอัตโนมัติ สร้างด้วย **Next.js 16 (App Router)** และ **LINE Messaging API**

---

## Overview

Everglow Travel มี 3 ส่วนหลัก

* 🌐 **Website** — รายการทัวร์, รายละเอียดทัวร์, รีวิว, เกี่ยวกับ, ติดต่อ (`/th`, `/en`)
* 💬 **LINE Bot** — ค้นหาทัวร์จากข้อความ (ประเทศ / เดือน / งบ / โปรโมชัน), Quick Reply, Rich Menu, Admin Notification
* 📦 **Data Layer** — ใช้ JSON ทั้งหมด (ไม่มี Database หรือ CMS)


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


```bash
npm run lint
npx tsc --noEmit
npm run build
```

---