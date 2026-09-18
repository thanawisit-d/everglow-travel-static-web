# Everglow Travel

เว็บทัวร์สองภาษา (TH/EN) + LINE Official Account Bot ของ Everglow Travel สร้างด้วย Next.js (App Router)

---

## 1. Project Overview

- **เว็บไซต์**: แสดงรายการทัวร์ในประเทศ / ต่างประเทศ, รายละเอียดทัวร์, รีวิว, เกี่ยวกับ, ติดต่อ — รองรับ `/th` และ `/en`
- **LINE Bot**: ตอบข้อความอัตโนมัติ (ค้นหาทัวร์ ตามประเทศ/เดือน/งบ/โปรโมชัน), แจ้งเตือน admin, Broadcast โปรโมชัน
- **Data**: JSON เท่านั้น (ไม่มี CMS / database) — `tours-th.json` เป็น Single Source of Truth

Sprint ปัจจุบัน: **6.0 (Production Polish & Data QA)** — สถานะตาม `git log`

---

## 2. Tech Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript (backend + core lib) / JavaScript (frontend components) |
| Styling | Tailwind CSS v4 + vanilla CSS (`src/styles/`) |
| LINE | `@line/bot-sdk` v11 (Messaging API) |
| Deploy | Vercel — auto-deploy จาก branch `deploy` |
| Static Export | `output: export` (หน้าเว็บเป็น static, API routes ใช้ Node runtime) |

---

## 3. Folder Structure

```
src/
├── app/
│   ├── (landing)/          หน้า Landing
│   ├── [locale]/           /th หรือ /en (home, domestic, outbound, tours/[id], reviews, about, contact, privacy)
│   ├── api/
│   │   ├── health/         Health check
│   │   ├── tours/          GET /api/tours (filter: locale, country, q, minPrice, maxPrice)
│   │   └── line/
│   │       ├── webhook/    POST /api/line/webhook (LINE event handler)
│   │       └── broadcast/  POST /api/line/broadcast (guard: BROADCAST_ENABLED)
│   ├── error.js, not-found.js, loading.js
│   ├── layout.js, globals.css
│   ├── robots.js, sitemap.js
├── components/             UI components (TourCard, FilterSidebar, SearchWidget, Footer, ...)
├── lib/
│   ├── tours-data.ts       อ่าน tours JSON (getTours, getPopularTours, searchTours, ...)
│   ├── search-filters.ts   Search Engine (extractSearchFilters → filterTours)
│   ├── line-reply.ts       detectIntent + buildReply + buildSearchEngineReply + buildAdminNotification
│   ├── line-flex.ts        buildTourCarousel / buildTourFlex (Flex Message)
│   ├── line-broadcast.ts   buildBroadcastPayload("monthly" | "promotion")
│   ├── line.ts, line-quick-reply.ts, line-config.ts, env.ts
│   ├── logger.ts           structured logger + broadcast/admin logs
│   └── (web helpers: i18n, pricing, dateFilter, tour-utils, tracking, assets, useToursFilter)
├── types/                  tour.ts (Tour, SearchFilters), intent.ts, line.ts, api.ts
├── utils/price.ts          toNumber / formatPrice
├── data/                   tours-th.json, tours-en.json, reviews.json, site-config.json
├── styles/                 CSS ทุกหน้า (import ผ่าน globals.css)
public/                     รูป, PDF, plane-logo, flag_country, ...
scripts/                    normalizing scripts (dev only)
docs/                       DEPLOY.md, LINE-OA-SETUP.md
```

---

## 4. Installation

```bash
# 1. ติดตั้ง dependencies
npm install

# 2. สร้าง env file
cp .env.example .env.local

# 3. เติมค่าจริงใน .env.local (LINE secrets + feature flags + NEXT_PUBLIC_*)
#    .env.local ถูก git-ignore อยู่แล้ว — ห้าม commit

# 4. รัน dev server
npm run dev
```

เปิด http://localhost:3000/th หรือ http://localhost:3000/en

> **LINE functions ทำงานได้แค่ตอน env LINE ครบ** — ถ้ายังไม่มี token ให้เว็บ static ยังรันได้ปกติ
> ดูวิธีหา LINE token/Admin ID ใน `docs/DEPLOY.md` หรือ `docs/LINE-OA-SETUP.md`

---

## 5. Available Scripts

| Command | ความหมาย |
|---|---|
| `npm run dev` | Dev server (http://localhost:3000) |
| `npm run build` | Production build (tsc + next build) |
| `npm start` | Serve production build หลัง `build` |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check |

---

## 6. LINE OA Setup

สรุปขั้นตอน (รายละเอียดเต็มใน `docs/LINE-OA-SETUP.md`):

1. สร้าง LINE Official Account +เปิด Messaging API
2. ตั้ง Webhook URL = `https://<your-domain>/api/line/webhook`
3. เก็บ `LINE_CHANNEL_ACCESS_TOKEN` + `LINE_CHANNEL_SECRET` ใส่ `.env.local`
4. หา `LINE_ADMIN_USER_ID` (ส่งข้อความให้ bot 1 ครั้ง → ดู userId ใน Webhook log)
5. ตั้ง `ADMIN_NOTIFICATION_ENABLED=true` ถ้าต้องการให้ bot push แจ้ง admin

### Intent Flow

```
ลูกค้า → LINE OA → POST /api/line/webhook
  → verifySignature (x-line-signature)
  → detectIntent(text)           จำแนกเป็น 1 ใน 13 intents
  → buildReply(result, locale)   ผ่าน Search Engine (extractSearchFilters → filterTours)
  → replyWithPayload             ตอบ Flex Carousel (max 5) + ข้อความ + Quick Reply 5 ปุ่ม
  → notifyAdmin (เฉพาะ booking/tourInquiry/contactAdmin เข้า Queue push)
```

---

## 7. Broadcast Preview

Broadcast = ส่งโปรโมชัน/โปรแกรมประจำเดือนแบบ Push ถึงผู้ติดตามทุกคน

- **Preview (ไม่ส่งจริง)**: `GET /api/line/broadcast?preview=true&type=monthly` → 200 + JSON payload
- **ส่งจริง**: `POST /api/line/broadcast` body `{ "type": "monthly" | "promotion" }`
- **ต้องเปิด**: `BROADCAST_ENABLED=true` ใน `.env.local` (ถ้า `false` → 403)
- รายละเอียด: `docs/DEPLOY.md`

---

## 8. Git Workflow (backend / deploy)

- **`backend`** = branch ที่ทำงานหลัก (commit ได้เลย)
- **`deploy`** = Production branch ของ Vercel **merge เท่านั้น ห้าม commit ตรง**
- **`main`** = baseline เดิม (ไม่แตะ)

```bash
# ทุกครั้งที่อยากให้ขึ้น production
git checkout deploy
git merge backend
git push origin deploy     # Vercel rebuild อัตโนมัติ
git checkout backend
git push origin backend
```

---

## Testing

- **Web**: `npm run lint` + `npx tsc --noEmit` + `npm run build`
- **LINE (local)**: ใช้ LINE Console ส่ง test message ไป webhook (ต้อง deploy ก่อน เพราะ LINE ต้องการ HTTPS public)
- **LINE (production)**: แอด bot → พิมพ์ "สวัสดี" / "ญี่ปุ่น" / "โปรโมชั่นล่าสุด" / "เมษายนไปไหน"