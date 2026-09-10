# PROJECT_CONTEXT.md — Everglow Travel Canonical Project Context (GPT + OpenCode)

> Canonical context for Everglow Travel project.
>
> This document is the single source of truth for OpenCode and ChatGPT.
> Do not change architecture, workflow, search behavior, or sprint order unless explicitly instructed.

---

# Project Overview

**Project Name:** Everglow Travel

**Repository:** everglow-travel-static-web

**Framework:** Next.js 16.3.2 (App Router)

**Language:** TypeScript + JavaScript (allowJs enabled)

**Styling:** Tailwind CSS 4 + Custom CSS

**Backend:** LINE Messaging API v11

**Deployment:** Vercel

**Database:** None (JSON only)

**Current Stage:** MVP Production Ready (Sprint 3 Complete)

---

# Current Project Status

## Overall Status

| Area | Status |
|------|--------|
| Website | ✅ Production Ready |
| LINE Webhook | ✅ Working |
| Smart Search | ✅ Working |
| Flex Message | ✅ Working |
| Quick Reply | ✅ Working |
| Vercel Deploy | ✅ Working |
| Rich Menu | ⏳ Not Started |
| Booking System | ⏳ Planned |
| Database | ⏳ Planned |

**Production Score:** 94/100

---

# Canonical Branch Workflow

This workflow must never change.

```text
main
│
├── backend   → Development
│
└── deploy    → Production (Vercel)
```

## Deployment Workflow

1. Develop only on **backend**.
2. Commit only on **backend**.
3. Merge backend → deploy.
4. Push deploy.
5. Vercel automatically deploys Production.

Never commit directly to deploy.

---

# Current Architecture

```text
Next.js App Router
│
├── Frontend
│   ├── Landing
│   ├── Domestic
│   ├── Outbound
│   ├── Tour Detail
│   ├── Reviews
│   └── Contact
│
├── API Routes
│   ├── /api/health
│   ├── /api/tours
│   └── /api/line/webhook
│
├── Business Logic
│   ├── tours-data.ts
│   ├── line-reply.ts
│   ├── line-flex.ts
│   ├── line.ts
│   ├── line-quick-reply.ts
│   ├── line-config.ts
│   ├── env.ts
│   ├── logger.ts
│   └── price.ts
│
└── JSON Data
    ├── tours-th.json
    ├── tours-en.json
    ├── reviews.json
    └── site-config.json
```

---

# Architecture Rules

These are production rules.

## Rule 1

Frontend and LINE Bot **must use the same search logic**.

Use:

- `searchTours()`
- `filterTours()`
- `getTours()`

inside `tours-data.ts`.

Never duplicate search code.

## Rule 2

Business logic stays inside `src/lib`.

UI components should never implement search/business rules.

## Rule 3

JSON data is immutable.

Use:

```ts
Object.freeze(...)
```

Return copied arrays.

Never mutate cached data.

---

# Sprint Progress

## Sprint 1 — LINE OA Integration

**Status:** COMPLETE

### Completed

- LINE Messaging API
- Webhook
- Signature Verification
- Health API
- Tours API
- Welcome Message
- Follow Event
- Postback Event
- Unfollow Logging

---

## Sprint 2 — Smart Search V1

**Status:** COMPLETE

### Supported Search

- Greeting
- Country
- City
- Budget
- Days
- Promotion
- Contact Admin

### Parser Supports

```text
ญี่ปุ่น
ญี่ปุ่น 5 วัน
โตเกียว
โตเกียว 30000
โอซาก้า 5 วัน 25000
โปรโมชั่น
โปรญี่ปุ่น
งบ30000
ไม่เกิน30000
```

### Search Filters

- Country
- City
- Max Price
- Min Price
- Days

### Canonical Intent Priority (actual deployed order in `detectIntent()`)

1. greeting
2. contactAdmin
3. bookingTour
4. monthlyProgram
5. promotionSearch
6. searchTour
7. priceSearch
8. unknown

Special case: a message beginning with `^` is treated as `priceSearch` (checked before `contactAdmin`).

The Rich Menu button "จองทัวร์" sends the message `จองทัวร์` into the bot,
which is detected as `bookingTour` via `BOOKING_KEYWORDS`.

The Rich Menu button "โปรแกรมประจำเดือน" sends the message `โปรแกรมประจำเดือน` into the bot,
which is detected as `monthlyProgram` via `MONTHLY_PROGRAM_KEYWORDS`.

Never change this priority without updating this document to match `detectIntent()`.

---

## Sprint 3 — Flex Message + Quick Reply

**Status:** COMPLETE

### Completed

#### Quick Reply

Every text reply includes Quick Reply automatically.

Buttons:

- ญี่ปุ่น
- เกาหลี
- ไต้หวัน
- ไทย
- โปรโมชั่น
- ติดต่อแอดมิน

#### Flex Message

Bubble includes

- Hero Image
- Destination
- City
- Duration
- Price
- Detail Button
- Contact Button

#### Carousel Rules

0 tours

→ Throw Error

1 tour

→ Bubble

2–5 tours

→ Carousel

6+ tours

→ Carousel first 5 + summary text.

#### ReplyPayload

Bot returns

```ts
{
  text?: string
  flex?: FlexMessage
}
```

#### replyWithPayload()

Rules

1. Flex first.
2. Text summary second.
3. Quick Reply only on text.
4. Flex failure → fallback text.

#### Error Handling

Implemented

- Empty carousel guard.
- Flex fallback.
- Image fallback.
- Correlation ID logging.
- Error logger.

---

# Current Search Behavior (Canonical)

| User Input | Behavior |
|------------|----------|
| ญี่ปุ่น | Search country |
| โตเกียว | Search city |
| ญี่ปุ่น 30000 | Country + budget |
| ญี่ปุ่น 5 วัน | Country + days |
| ญี่ปุ่น โตเกียว 5 วัน 30000 | Combined filters |
| โปรโมชั่น | Cheapest tours |
| โปรญี่ปุ่น | Promotion + country |
| งบ30000 | Price search only |
| ไม่เกิน25000 | Price search only |

This behavior is considered production behavior.

---

# LINE Bot Features (Current)

## Supported Events

- Message
- Follow
- Unfollow
- Postback

## Supported Responses

- Text
- Flex Bubble
- Flex Carousel
- Quick Reply

## Admin Notification

Code exists.

Currently disabled until `LINE_ADMIN_USER_ID` is configured.

---

# Tour Data

## Current Data Source

JSON only.

### Files

- tours-th.json
- tours-en.json

### Current Scale

- Thai tours: 123
- English tours: 25

### Tour Type

Supports

- domestic
- outbound

### Tour Fields

Current important fields

- id
- country
- city
- province
- duration
- image
- airline
- transport
- itinerary
- pdf

---

# Environment Variables

## Required

```env
LINE_CHANNEL_ACCESS_TOKEN
LINE_CHANNEL_SECRET
```

## Optional (Recommended in Production)

```env
NEXT_PUBLIC_SITE_URL
LINE_ADMIN_USER_ID
```

If `NEXT_PUBLIC_SITE_URL` is missing:

- Falls back to `https://everglow-travel-static-web.vercel.app` (see `env.ts`).

If `LINE_ADMIN_USER_ID` is missing:

- Build still succeeds.
- Admin push notification disabled.

---

# Production Deploy Rules

## Vercel

Production branch

```text
deploy
```

Preview / Development

```text
backend
```

### Webhook URL

```text
/api/line/webhook
```

Webhook verification must remain enabled.

Auto Reply in LINE OA must remain OFF.

Use Webhook must remain ON.

---

# Frontend Status

## Completed Pages

- Landing
- Home
- About
- Contact
- Reviews
- Privacy
- Domestic
- Outbound
- Tour Detail

## Existing Components

Reusable components include

- Header
- Hero
- SearchWidget
- FilterSidebar
- TourGrid
- TourCard
- Pagination
- Footer
- ReviewSection
- TourProgram

Architecture is considered stable.

---

# Technical Debt (Known Issues)

## Critical

### 1. Hardcoded SITE_URL

Current issue:

`src/lib/line-flex.ts` hardcodes the production URL.

Goal:

Everything uses

```ts
env.siteUrl
```

Priority:

Sprint 4.

### 2. Province Type

Current type

```ts
province?: string
```

Future

```ts
province?: string | string[]
```

### 3. Metadata

Tour detail pages need metadata generation.

Priority Sprint 4.

---

## Medium Priority

- Split `line-reply.ts`.
- Structured duration fields.
- Search ranking improvements.
- Alias dictionary.

---

# UI / UX Roadmap

## Current UI

Website is considered complete for MVP.

## Planned UI Improvements

### Hero V2

- Search inside Hero.
- Popular destination chips.
- LINE CTA.

### Tour Card V2

- HOT badge.
- PROMO badge.
- Airline logo.
- Departure date.

### Filter Sidebar V2

Add

- Airline
- Month
- Duration
- Price sorting

These belong to Sprint 4 and Sprint 5.

---

# Rich Menu (Sprint 4)

Rich Menu is the highest priority remaining LINE feature.

## Planned Buttons

1. ญี่ปุ่น
2. เกาหลี
3. โปรโมชั่น
4. ติดต่อแอดมิน
5. ทัวร์ต่างประเทศ
6. ทัวร์ในประเทศ

### Actions

- Message Action for search buttons.
- URI Action for website buttons.

Rich Menu artwork will be created before implementation.

---

# Sprint Roadmap (Canonical)

## Sprint 1

LINE OA Integration

Status: COMPLETE

## Sprint 2

Smart Search V1

Status: COMPLETE

## Sprint 3

Flex Message + Quick Reply

Status: COMPLETE

## Sprint 4

Rich Menu + Flex V2 + Smart Search V2

Status: CURRENT SPRINT

Tasks:

- Rich Menu Design
- Rich Menu Integration
- Rich Menu Actions
- Flex V2 UI
- Alias Search
- Month Search
- Airline Search

## Sprint 5

Booking MVP

Planned

Features

- Booking flow
- Contact admin flow
- Customer information
- Booking summary

No database yet.

## Sprint 6

Database Migration

Target:

Supabase PostgreSQL

Maintain same API interface.

## Sprint 7

Analytics + CRM

Track

- Searches
- Popular Tours
- Leads
- Booking Conversion

## Sprint 8

Production Polish

- SEO
- Metadata
- Structured Data
- Performance
- Accessibility

---

# Coding Rules for OpenCode

These rules must always be followed.

## Before Editing Code

Always explain

1. Which sprint.
2. Which step.
3. Which files change.
4. Why.

Never edit unrelated files.

## Search Rules

Never duplicate parser logic.

Parser stays inside `line-reply.ts` until Sprint 5 refactor.

## Flex Rules

Always

- Bubble for one tour.
- Carousel for multiple tours.
- Max five bubbles.
- Flex first.
- Text second.

## Environment Rules

Never hardcode URLs.

Always read from `env.siteUrl`.

## Branch Rules

Never modify production branch directly.

Work only on backend.

---

# Production Checklist

## Backend

- [x] Webhook Verification
- [x] ENV Validation
- [x] Smart Search
- [x] Flex Message
- [x] Quick Reply
- [x] Error Handling
- [ ] Rich Menu
- [ ] Booking API
- [ ] Admin Notification Enabled

## Frontend

- [x] Landing Page
- [x] Tour Listing
- [x] Tour Detail
- [x] Reviews
- [x] Robots
- [x] Sitemap
- [ ] Tour Metadata
- [ ] Structured Data
- [ ] Image Optimization

## LINE OA

- [x] Messaging API
- [x] Webhook
- [x] Quick Reply
- [x] Flex Carousel
- [ ] Rich Menu
- [ ] Greeting Rich Menu
- [ ] Persistent Rich Menu

---

# OpenCode Instructions

OpenCode should always treat this document as canonical.

When asked to modify the project:

- Respect sprint order.
- Preserve production architecture.
- Preserve search behavior.
- Preserve replyWithPayload behavior.
- Preserve Quick Reply middleware.
- Preserve backend → deploy workflow.

Do not refactor architecture unless explicitly requested.

Current sprint is **Sprint 4**.
Current highest priority feature is **Rich Menu Integration**.