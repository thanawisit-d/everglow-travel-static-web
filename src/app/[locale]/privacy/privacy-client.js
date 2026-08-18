'use client';

import Link from 'next/link';
import config from '@/data/site-config.json';

const content = {
  th: {
    title: 'นโยบายคุ้มครองข้อมูลส่วนบุคคล',
    subtitle: 'บริษัท เอเวอร์โกลว์ โกลบอล จำกัด',
    effectiveDate: 'ประกาศ ณ วันที่ 17 สิงหาคม 2569',
    sections: [
      {
        heading: '1. บทนำ',
        body: 'บริษัท เอเวอร์โกลว์ โกลบอล จำกัด ("บริษัท") เล็งเห็นถึงความสำคัญของการคุ้มครองข้อมูลส่วนบุคคลของลูกค้า ผู้เข้าชมเว็บไซต์ และผู้ใช้บริการทุกท่าน นโยบายคุ้มครองข้อมูลส่วนบุคคลฉบับนี้จัดทำขึ้นเพื่ออธิบายวิธีการที่บริษัทเก็บรวบรวม ใช้ เปิดเผย และคุ้มครองข้อมูลส่วนบุคคลของท่าน ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 ("พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล") การใช้บริการเว็บไซต์ www.everglowtravel.com ("เว็บไซต์") ถือว่าท่านได้อ่านและเข้าใจนโยบายคุ้มครองข้อมูลส่วนบุคคลฉบับนี้แล้ว',
      },
      {
        heading: '2. ข้อมูลผู้ควบคุมข้อมูลส่วนบุคคล',
        table: [
          ['ชื่อบริษัท', 'บริษัท เอเวอร์โกลว์ โกลบอล จำกัด'],
          ['เลขทะเบียนนิติบุคคล', '[เลขทะเบียนบริษัท]'],
          ['ที่อยู่สำนักงาน', '[ที่อยู่สำนักงานจดทะเบียน]'],
          ['โทรศัพท์', '099-632-6146'],
          ['อีเมล', 'everglowtravel@gmail.com'],
        ],
      },
      {
        heading: '3. ข้อมูลส่วนบุคคลที่บริษัทเก็บรวบรวม',
        body: 'บริษัทเก็บรวบรวมข้อมูลส่วนบุคคลของท่าน 2 ประเภท ดังนี้',
        sub: [
          {
            title: '3.1 ข้อมูลที่เก็บรวบรวมโดยอัตโนมัติ',
            body: 'เมื่อท่านเข้าใช้งานเว็บไซต์ บริษัทจะเก็บรวบรวมข้อมูลโดยอัตโนมัติ ได้แก่ ข้อมูลเกี่ยวกับอุปกรณ์ (Device Information) เช่น ประเภทอุปกรณ์ ระบบปฏิบัติการ ขนาดจอ ประเภทเบราว์เซอร์, ข้อมูลเกี่ยวกับการใช้งาน (Usage Information) เช่น หน้าเว็บที่เข้าชม ระยะเวลาที่เข้าชม แหล่งที่มาของการเข้าชม, ข้อมูล IP Address ของท่าน, Cookie และเทคโนโลยีที่คล้ายคลึงกัน',
          },
          {
            title: '3.2 ข้อมูลที่ท่านให้แก่บริษัทโดยตรง',
            body: 'ในกรณีที่ท่านติดต่อบริษัทผ่านช่องทางต่างๆ เช่น โทรศัพท์ หรือ LINE Official Account บริษัทอาจเก็บรวบรวมข้อมูล ได้แก่ ชื่อ-นามสกุล, หมายเลขโทรศัพท์, LINE ID, ข้อความหรือข้อมูลอื่นๆ ที่ท่านให้แก่บริษัท',
          },
        ],
      },
      {
        heading: '4. วัตถุประสงค์ในการเก็บรวบรวมและใช้ข้อมูลส่วนบุคคล',
        table: [
          ['วัตถุประสงค์', 'ฐานทางกฎหมาย'],
          ['เพื่อให้บริการจองทัวร์และติดต่อกลับ', 'สัญญา (มาตรา 24(1))'],
          ['เพื่อวิเคราะห์จำนวนผู้เข้าชมและปรับปรุงเว็บไซต์', 'ความยินยอม (มาตรา 19)'],
          ['เพื่อทำการตลาดผ่าน Facebook (Facebook Pixel)', 'ความยินยอม (มาตรา 19)'],
          ['เพื่อปฏิบัติตามกฎหมายและระเบียบที่เกี่ยวข้อง', 'หน้าทางกฎหมาย (มาตรา 24(2))'],
        ],
      },
      {
        heading: '5. การเปิดเผยข้อมูลส่วนบุคคลแก่บุคคลภายนอก',
        body: 'บริษัทอาจเปิดเผยข้อมูลส่วนบุคคลของท่านแก่บุคคลภายนอก ดังต่อไปนี้',
        table: [
          ['ผู้รับข้อมูล', 'วัตถุประสงค์', 'ประเทศที่รับข้อมูล'],
          ['Google LLC (Google Analytics)', 'วิเคราะห์การเข้าชมเว็บไซต์', 'สหรัฐอเมริกา'],
          ['Meta Platforms Inc. (Facebook Pixel)', 'ทำการตลาดผ่าน Facebook', 'สหรัฐอเมริกา'],
          ['LINE Corporation', 'ติดต่อสื่อสารผ่าน LINE', 'ญี่ปุ่น'],
        ],
        footer: 'บริษัทจะดำเนินมาตรการที่เหมาะสมเพื่อคุ้มครองข้อมูลส่วนบุคคลของท่านตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล รวมถึงการดำเนินมาตรการรักษาความปลอดภัยของข้อมูลส่วนบุคคลตามมาตรา 37 และการโอนย้ายข้อมูลข้ามพรมแดนตามมาตรา 28-29',
      },
      {
        heading: '6. การเก็บรักษาข้อมูลส่วนบุคคล',
        body: 'บริษัทจะเก็บรักษาข้อมูลส่วนบุคคลของท่านไว้ตราบเท่าที่จำเป็นเพื่อดำเนินการตามวัตถุประสงค์ที่ระบุไว้ในนโยบายฉบับนี้ หรือจนกว่าท่านจะขอให้ลบข้อมูล',
        table: [
          ['ประเภทข้อมูล', 'ระยะเวลาการเก็บรักษา'],
          ['ข้อมูลการติดต่อ (ชื่อ, เบอร์โทร)', 'จนกว่าจะขอให้ลบ'],
          ['ข้อมูลการใช้งานเว็บไซต์', 'สูงสุด 26 เดือน (ตาม Google Analytics)'],
          ['บันทึกความยินยอม (Consent Log)', 'อย่างน้อย 12 เดือน'],
        ],
      },
      {
        heading: '7. สิทธิของเจ้าของข้อมูลส่วนบุคคล',
        body: 'ท่านมีสิทธิดังต่อไปนี้ตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล',
        table: [
          ['สิทธิ', 'รายละเอียด'],
          ['สิทธิ์เข้าถึง (Access)', 'ท่านมีสิทธิ์ขอเข้าถึงข้อมูลส่วนบุคคลของท่านที่อยู่ในความดูแลของบริษัท'],
          ['สิทธิ์แก้ไข (Correction)', 'ท่านมีสิทธิ์ขอแก้ไขข้อมูลส่วนบุคคลของท่านให้ถูกต้องและเป็นปัจจุบัน'],
          ['สิทธิ์ลบ (Deletion)', 'ท่านมีสิทธิ์ขอให้ลบข้อมูลส่วนบุคคลของท่าน เว้นแต่มีเหตุจำเป็นที่บริษัทต้องเก็บรักษาไว้'],
          ['สิทธิ์คัดค้าน (Objection)', 'ท่านมีสิทธิ์คัดค้านการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคลของท่าน'],
          ['สิทธิ์โอนย้าย (Portability)', 'ท่านมีสิทธิ์ขอรับข้อมูลส่วนบุคคลของท่านในรูปแบบที่สามารถโอนย้ายได้'],
          ['สิทธิ์ถอนความยิน Consent', 'ท่านมีสิทธิ์ถอนความยิน Consent ที่ได้ให้ไว้แก่บริษัทได้ทุกเมื่อ'],
        ],
        footer: 'ท่านสามารถใช้สิทธิดังกล่าวได้โดยติดต่อบริษัทผ่านช่องทางที่ระบุในข้อ 10 บริษัทจะพิจารณาและดำเนินการตามคำขอภายใน 30 วันนับแต่วันที่ได้รับคำขอ',
      },
      {
        heading: '8. มาตรการรักษาความปลอดภัย',
        body: 'บริษัทดำเนินมาตรการรักษาความปลอดภัยที่เหมาะสมเพื่อป้องกันการสูญหาย การเข้าถึงโดยไม่ได้รับอนุญาต การใช้ การเปลี่ยนแปลง หรือการเปิดเผยข้อมูลส่วนบุคคลโดยไม่ชอบด้วยกฎหมาย ซึ่งสอดคล้องกับมาตรา 37 แห่ง พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล',
      },
      {
        heading: '9. นโยบายคุกกี้ (Cookie Policy)',
        sub: [
          {
            title: '9.1 คุกกี้คืออะไร',
            body: 'คุกกี้ (Cookie) คือไฟล์ข้อความขนาดเล็กที่ถูกดาวน์โหลดไปยังอุปกรณ์ของท่านเมื่อท่านเข้าเยี่ยมชมเว็บไซต์ คุกกี้ช่วยให้เว็บไซต์จดจำการตั้งค่าและการเข้าชมครั้งก่อนๆ ของท่าน',
          },
          {
            title: '9.2 คุกกี้ที่เว็บไซต์ใช้งาน',
            body: 'เว็บไซต์ www.everglowtravel.com ใช้คุกกี้ดังต่อไปนี้',
            table: [
              ['ชื่อคุกกี้', 'ผู้ให้บริการ', 'วัตถุประสงค์', 'ระยะเวลา', 'ต้องขอ consent'],
              ['everglow_consent', 'บริษัท', 'บันทึกความยินยอมในการใช้คุกกี้', '12 เดือน', 'ไม่ต้อง'],
              ['_ga', 'Google Analytics', 'ระบุตัวตนผู้ใช้', '2 ปี', 'ต้องขอ'],
              ['_gid', 'Google Analytics', 'ระบุตัวตนผู้ใช้', '24 ชั่วโมง', 'ต้องขอ'],
              ['_fbp', 'Facebook (Meta)', 'ติดตามพฤติกรรมผู้ใช้จากโฆษณา Facebook', '3 เดือน', 'ต้องขอ'],
            ],
          },
          {
            title: '9.3 วิธีการจัดการคุกกี้',
            body: 'ท่านสามารถจัดการคุกกี้ได้โดยการกดปุ่ม "ตั้งค่า Cookie" ที่ด้านล่างของเว็บไซต์ หรือเปลี่ยนแปลงการตั้งค่าได้ตลอดเวลาผ่าน Cookie Consent Banner ที่ปรากฏเมื่อท่านเข้าเว็บไซต์ครั้งแรก',
          },
          {
            title: '9.4 คุกกี้ของบุคคลที่สาม',
            table: [
              ['ผู้ให้บริการ', 'วัตถุประสงค์', 'นโยบายคุกกี้'],
              ['Google (Google Analytics)', 'วิเคราะห์การเข้าชม', 'https://policies.google.com/privacy'],
              ['Meta (Facebook Pixel)', 'ทำการตลาด', 'https://www.facebook.com/privacy/policy'],
            ],
          },
          {
            title: '9.5 การโอนย้ายข้อมูลไปต่างประเทศ',
            body: 'ข้อมูลที่รวบรวมผ่านคุกกี้อาจถูกโอนย้ายและจัดเก็บใน server 位于ต่างประเทศ ได้แก่ Google LLC (สหรัฐอเมริกา) และ Meta Platforms Inc. (สหรัฐอเมริกา) บริษัทดำเนินมาตรการที่เหมาะสมเพื่อคุ้มครองข้อมูลส่วนบุคคลของท่านตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล มาตรา 28-29',
          },
        ],
      },
      {
        heading: '10. ช่องทางการติดต่อ',
        body: 'หากท่านมีคำถาม ข้อเสนอแนะ หรือต้องการใช้สิทธิตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล ท่านสามารถติดต่อบริษัทได้ที่',
        table: [
          ['ช่องทาง', 'รายละเอียด'],
          ['โทรศัพท์', '099-632-6146'],
          ['อีเมล', 'everglowtravel@gmail.com'],
          ['LINE Official Account', '@everglowtravel'],
        ],
      },
      {
        heading: '11. สิทธิในการร้องเรียน',
        body: 'หากท่านเห็นว่าบริษัทไม่ได้ปฏิบัติตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล ท่านมีสิทธิ์ร้องเรียนต่อคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล (PDPC) ได้',
        table: [
          ['ช่องทาง', 'รายละเอียด'],
          ['เว็บไซต์', 'https://pdpc.th'],
          ['โทรศัพท์', '02-141-6789'],
        ],
      },
      {
        heading: '12. การแก้ไขนโยบายคุ้มครองข้อมูลส่วนบุคคล',
        body: 'บริษัทอาจแก้ไขนโยบายคุ้มครองข้อมูลส่วนบุคคลนี้เป็นครั้งคราว โดยจะแจ้งให้ท่านทราบผ่านเว็บไซต์หรือช่องทางการสื่อสารอื่นๆ ที่เหมาะสม',
      },
      {
        heading: '13. ประสิทธิผลของนโยบายคุ้มครองข้อมูลส่วนบุคคล',
        body: 'นโยบายคุ้มครองข้อมูลส่วนบุคคลนี้มีผลใช้บังคับตั้งแต่วันที่ 17 สิงหาคม 2569 เป็นต้นไป',
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    subtitle: 'Everglow Global Co., Ltd.',
    effectiveDate: 'Effective Date: August 17, 2026',
    sections: [
      {
        heading: '1. Introduction',
        body: 'Everglow Global Co., Ltd. ("the Company") recognizes the importance of protecting the personal data of our customers, website visitors, and all service users. This Privacy Policy explains how the Company collects, uses, discloses, and protects your personal data in accordance with the Personal Data Protection Act B.E. 2562 ("PDPA"). Your use of the website www.everglowtravel.com ("the Website") constitutes your acknowledgment that you have read and understood this Privacy Policy.',
      },
      {
        heading: '2. Data Controller',
        table: [
          ['Item', 'Details'],
          ['Company Name', 'Everglow Global Co., Ltd.'],
          ['Registration Number', '[Company Registration Number]'],
          ['Registered Address', '[Registered Office Address]'],
          ['Phone', '099-632-6146'],
          ['Email', 'everglowtravel@gmail.com'],
        ],
      },
      {
        heading: '3. Personal Data We Collect',
        body: 'The Company collects two types of personal data:',
        sub: [
          {
            title: '3.1 Automatically Collected Data',
            body: 'When you visit the Website, we automatically collect device information (device type, operating system, screen size, browser type), usage information (pages visited, duration, referral source), your IP address, and cookies and similar technologies.',
          },
          {
            title: '3.2 Data You Provide Directly',
            body: 'When you contact us via phone or LINE Official Account, we may collect your name, phone number, LINE ID, and any messages or information you provide.',
          },
        ],
      },
      {
        heading: '4. Purpose of Collection and Use',
        table: [
          ['Purpose', 'Legal Basis'],
          ['To provide tour booking services and contact you', 'Contract (Section 24(1))'],
          ['To analyze visitor traffic and improve the Website', 'Consent (Section 19)'],
          ['To conduct marketing via Facebook (Facebook Pixel)', 'Consent (Section 19)'],
          ['To comply with applicable laws and regulations', 'Legal Obligation (Section 24(2))'],
        ],
      },
      {
        heading: '5. Disclosure to Third Parties',
        body: 'The Company may disclose your personal data to the following third parties:',
        table: [
          ['Recipient', 'Purpose', 'Country'],
          ['Google LLC (Google Analytics)', 'Website analytics', 'United States'],
          ['Meta Platforms Inc. (Facebook Pixel)', 'Facebook marketing', 'United States'],
          ['LINE Corporation', 'Communication via LINE', 'Japan'],
        ],
        footer: 'The Company will take appropriate measures to protect your personal data in accordance with the PDPA, including security measures under Section 37 and cross-border data transfer under Sections 28-29.',
      },
      {
        heading: '6. Data Retention',
        body: 'The Company will retain your personal data only as long as necessary for the purposes described in this Policy, or until you request deletion.',
        table: [
          ['Data Type', 'Retention Period'],
          ['Contact information (name, phone)', 'Until deletion is requested'],
          ['Website usage data', 'Up to 26 months (per Google Analytics)'],
          ['Consent logs', 'At least 12 months'],
        ],
      },
      {
        heading: '7. Your Rights',
        body: 'You have the following rights under the PDPA:',
        table: [
          ['Right', 'Description'],
          ['Access', 'You may request access to your personal data held by the Company'],
          ['Correction', 'You may request correction of your personal data to be accurate and up-to-date'],
          ['Deletion', 'You may request deletion of your personal data, unless the Company has grounds to retain it'],
          ['Objection', 'You may object to the collection, use, or disclosure of your personal data'],
          ['Portability', 'You may request to receive your personal data in a portable format'],
          ['Withdraw Consent', 'You may withdraw your consent at any time'],
        ],
        footer: 'You may exercise these rights by contacting the Company via the channels in Section 10. The Company will consider and process your request within 30 days of receipt.',
      },
      {
        heading: '8. Security Measures',
        body: 'The Company implements appropriate security measures to prevent loss, unauthorized access, use, alteration, or disclosure of personal data, in compliance with Section 37 of the PDPA.',
      },
      {
        heading: '9. Cookie Policy',
        sub: [
          {
            title: '9.1 What Are Cookies',
            body: 'Cookies are small text files downloaded to your device when you visit a website. They help the website remember your preferences and previous visits.',
          },
          {
            title: '9.2 Cookies We Use',
            body: 'The Website www.everglowtravel.com uses the following cookies:',
            table: [
              ['Cookie', 'Provider', 'Purpose', 'Duration', 'Consent Required'],
              ['everglow_consent', 'Company', 'Stores cookie consent preference', '12 months', 'No'],
              ['_ga', 'Google Analytics', 'Identifies unique users', '2 years', 'Yes'],
              ['_gid', 'Google Analytics', 'Identifies unique users', '24 hours', 'Yes'],
              ['_fbp', 'Facebook (Meta)', 'Tracks user behavior from Facebook ads', '3 months', 'Yes'],
            ],
          },
          {
            title: '9.3 Managing Cookies',
            body: 'You can manage cookies by clicking the "Cookie Settings" button at the bottom of the Website, or change your preferences at any time via the Cookie Consent Banner displayed on your first visit.',
          },
          {
            title: '9.4 Third-Party Cookies',
            table: [
              ['Provider', 'Purpose', 'Privacy Policy'],
              ['Google (Google Analytics)', 'Analytics', 'https://policies.google.com/privacy'],
              ['Meta (Facebook Pixel)', 'Marketing', 'https://www.facebook.com/privacy/policy'],
            ],
          },
          {
            title: '9.5 International Data Transfers',
            body: 'Data collected through cookies may be transferred and stored on servers in foreign countries, including Google LLC (United States) and Meta Platforms Inc. (United States). The Company implements appropriate safeguards in accordance with PDPA Sections 28-29.',
          },
        ],
      },
      {
        heading: '10. Contact Us',
        body: 'If you have questions, suggestions, or wish to exercise your rights under the PDPA, please contact us:',
        table: [
          ['Channel', 'Details'],
          ['Phone', '099-632-6146'],
          ['Email', 'everglowtravel@gmail.com'],
          ['LINE Official Account', '@everglowtravel'],
        ],
      },
      {
        heading: '11. Complaints',
        body: 'If you believe the Company has not complied with the PDPA, you have the right to file a complaint with the Personal Data Protection Committee (PDPC):',
        table: [
          ['Channel', 'Details'],
          ['Website', 'https://pdpc.th'],
          ['Phone', '02-141-6789'],
        ],
      },
      {
        heading: '12. Changes to This Policy',
        body: 'The Company may update this Privacy Policy from time to time. Changes will be communicated via the Website or other appropriate channels.',
      },
      {
        heading: '13. Effective Date',
        body: 'This Privacy Policy is effective from August 17, 2026 onwards.',
      },
    ],
  },
};

function renderTable(table) {
  if (!table || table.length === 0) return null;
  const [header, ...rows] = table;
  return (
    <div className="privacy-table-wrap">
      <table className="privacy-table">
        <thead>
          <tr>
            {header.map((cell, i) => (
              <th key={i}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci}>
                  {cell.startsWith('http') ? (
                    <a href={cell} target="_blank" rel="noopener noreferrer">
                      {cell}
                    </a>
                  ) : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderSection(section) {
  return (
    <div key={section.heading} className="privacy-section">
      <h2 className="privacy-section-heading">{section.heading}</h2>
      {section.body && <p className="privacy-section-body">{section.body}</p>}
      {section.table && renderTable(section.table)}
      {section.footer && <p className="privacy-section-footer">{section.footer}</p>}
      {section.sub?.map((sub) => (
        <div key={sub.title} className="privacy-sub">
          <h3 className="privacy-sub-heading">{sub.title}</h3>
          {sub.body && <p className="privacy-sub-body">{sub.body}</p>}
          {sub.table && renderTable(sub.table)}
        </div>
      ))}
    </div>
  );
}

export default function PrivacyClient({ locale }) {
  const t = content[locale] || content.th;
  const c = config[locale] || config.th;

  return (
    <main className="privacy-page">
      <div className="privacy-card">
        <div className="privacy-header">
          <Link href={`/${locale}`} className="privacy-back">
            &larr; {c.home}
          </Link>
          <h1 className="privacy-title">{t.title}</h1>
          <p className="privacy-subtitle">{t.subtitle}</p>
          <p className="privacy-date">{t.effectiveDate}</p>
        </div>
        <div className="privacy-content">
          {t.sections.map(renderSection)}
        </div>
      </div>
    </main>
  );
}
