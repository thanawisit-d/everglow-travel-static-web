# Everglow Travel — เว็บทัวร์

เว็บไซต์ Everglow Travel สองภาษา (TH/EN) สร้างด้วย Next.js

---

## เริ่มต้น

1. ติดตั้ง Dependencies
   npm install

2. รัน dev server
   npm run dev

3. เปิดเว็บ
   http://localhost:3000/th
   http://localhost:3000/en

---

## โครงสร้างโปรเจค

```
src/
├── app/              Routing (App Router)
│   └── [locale]/     /th หรือ /en
│       ├── home-client.js    หน้าแรก
│       ├── domestic/         ทัวร์ในประเทศ
│       ├── outbound/         ทัวร์ต่างประเทศ
│       ├── tours/[id]/       รายละเอียดทัวร์
│       ├── reviews/          รีวิว
│       ├── about/            เกี่ยวกับเรา
│       └── contact/          ติดต่อ
├── components/       Component ทั้งหมด (22 ไฟล์)
├── styles/           CSS ทั้งหมด (23 ไฟล์)
├── data/             ข้อมูล JSON (tours, reviews, config)
└── lib/              ฟังก์ชันช่วย (i18n, pricing...)

public/               รูป, PDF, assets ต่างๆ
```

---

## สิ่งที่ควรรู้

### Routing
- URL ทุกหน้ามี /th หรือ /en นำหน้า เช่น /th/domestic
- ไฟล์ [locale]/ คือ dynamic segment รับค่า th หรือ en

### Styling
- ใช้ Tailwind CSS v4 + vanilla CSS
- ไฟล์ CSS ทั้งหมด import ผ่าน globals.css
- ไม่ใช้ CSS Modules
- CSS variables หลักอยู่ใน base.css (--navy, --amber, --cyan, etc.)

### ข้อมูล
- ข้อมูลทัวร์อยู่ใน src/data/tours-th.json (มีทั้งภาษาไทยและฟิลด์ *\_en สำหรับหน้า English; tours-en.json มีข้อมูล domestic ชุด English แยกไว้)
- ข้อมูลรีวิวอยู่ใน src/data/reviews.json
- ข้อความ UI ทั้งสองภาษาอยู่ใน src/data/site-config.json
- ไม่มี CMS หรือ API — ทั้งหมดเป็น static data

### i18n (ภาษา)
- ใช้ [locale] segment ใน URL (ไม่ใช้ next-intl)
- ข้อความ UI อยู่ใน site-config.json แยก th/en
- ชื่อจังหวัด/ประเทศ แปลผ่าน src/lib/i18n.js

### Build
- Production: npm run build → export static HTML ไปที่ out/
- รัน production: npm run build && npx serve out
