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
        body: 'บริษัท เอเวอร์โกลว์ โกลบอล จำกัด (สำนักงานใหญ่) ตั้งอยู่ที่ 25/163 หมู่ 4 ตำบลบางไผ่ อำเภอเมือง นนทบุรี จังหวัดนนทบุรี ตระหนักและเคารพในความเป็นส่วนตัวของบุคคล และให้ความสำคัญกับการปกป้องข้อมูลที่จัดเก็บ เพื่อความเป็นส่วนตัวของท่าน บริษัทฯ จึงได้กำหนดหลักการและนโยบายความเป็นส่วนตัวขึ้นมา เพื่อควบคุมการใช้ ปกป้อง และปกปิดข้อมูลของท่านจากบุคคลภายนอก นโยบายนี้ใช้กับเว็บไซต์ **www.everglowtravel.com** โดยเราจะจัดเก็บและรวบรวมข้อมูลที่จำเป็นเท่านั้น ซึ่งขึ้นอยู่กับบริการที่ท่านใช้งานผ่านเว็บไซต์ของเรา เช่น การค้นหาและดูรายละเอียดทัวร์ การติดต่อผ่านโทรศัพท์ อีเมล หรือ LINE Official Account ทั้งนี้การดำเนินการทั้งหมดเป็นไปตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562',
      },
      {
        body: 'เมื่อท่านเข้าใช้งานเว็บไซต์ เราจะมีการจัดเก็บข้อมูลการเข้า-ออกในการใช้งานโดยอัตโนมัติ เช่น หมายเลขไอพี (IP Address) และประเภทของโปรแกรมบราวเซอร์ (Browser) โดยหมายเลขไอพีถูกจัดเก็บโดยผู้ให้บริการโฮสติ้งของเว็บไซต์ ส่วนข้อมูลเกี่ยวกับอุปกรณ์ (Device Information) เช่น ประเภทอุปกรณ์ ระบบปฏิบัติการ และขนาดจอ รวมถึงข้อมูลการใช้งาน (Usage Information) เช่น หน้าเว็บที่เข้าชม และแหล่งที่มาของการเข้าชม จะถูกจัดเก็บก็ต่อเมื่อท่านได้ให้ความยินยอมผ่านแบบฟอร์มคุกกี้ โดยเราจะนำข้อมูลของท่านไปใช้ให้เป็นไปตามกฎหมายและกฎเกณฑ์ต่างๆ ที่เกี่ยวข้อง เพื่อสร้างสรรค์และปรับปรุงการให้บริการให้ดียิ่งขึ้น',
      },
      {
        body: 'เราเก็บรวบรวมข้อมูลส่วนบุคคลของท่านเพื่อประโยชน์ ดังนี้ (ก) เพื่อความสะดวกในการติดต่อและให้บริการจองทัวร์ (ข) เพื่อให้บริการและติดต่อสื่อสารผ่านช่องทาง LINE Official Account (ค) เพื่อตอบคำถามและแก้ไขปัญหาที่ท่านแจ้ง (ง) เพื่อวัดความสนใจและความพึงพอใจในการให้บริการต่างๆ ผ่านการวิเคราะห์การเข้าชม (จ) เพื่อใช้เป็นข้อมูลในการพัฒนาบริการใหม่ๆ ให้ตรงกับความต้องการของท่าน และเพื่อทำการตลาดผ่าน Facebook (ฉ) เพื่อปฏิบัติตามหน้าที่ตามกฎหมาย โดย (ง) และ (จ) จะดำเนินการเมื่อท่านได้ให้ความยินยอมเท่านั้น ส่วน (ก) (ข) (ค) และ (ฉ) เป็นฐานของสัญญาและหน้าที่ตามกฎหมาย',
      },
      {
        body: 'โดยข้อมูลที่เก็บอาจรวมถึงข้อมูลที่ต้องระบุตัวตนของท่าน ซึ่งได้รับจากท่านเมื่อท่านติดต่อเราผ่านโทรศัพท์ อีเมล หรือ LINE Official Account เช่น ชื่อ-นามสกุล หมายเลขโทรศัพท์ ที่อยู่อีเมล LINE ID และข้อความหรือข้อมูลที่ท่านส่งให้เรา ซึ่งจะถือเป็นข้อมูลที่เป็นความลับ โดยเราไม่ขาย และไม่ให้เช่าข้อมูลส่วนบุคคลของท่านแก่บุคคลที่ไม่เกี่ยวข้อง อย่างไรก็ตาม เพื่อให้บริการต่างๆ สามารถดำเนินการได้ จึงมีการเปิดเผยข้อมูลที่จำเป็นให้แก่ Google LLC (สหรัฐอเมริกา) เพื่อวิเคราะห์การเข้าชมเว็บไซต์, Meta Platforms Inc. (สหรัฐอเมริกา) เพื่อทำการตลาดผ่าน Facebook, LINE Corporation (ญี่ปุ่น) เพื่อติดต่อสื่อสารผ่าน LINE และ Vercel Inc. (สหรัฐอเมริกา) เพื่อจัดเก็บเว็บไซต์และบันทึกการทำงานของระบบ โดยการเปิดเผยข้อมูลแก่ Google LLC และ Meta Platforms Inc. จะเกิดขึ้นเฉพาะเมื่อท่านได้ให้ความยินยอม',
      },
      {
        body: 'เราจะเก็บรักษาข้อมูลของท่านเท่าที่จำเป็นเพื่อวัตถุประสงค์ดังกล่าว หรือจนกว่าท่านจะขอให้ลบข้อมูล เว้นแต่กฎหมายกำหนดให้เก็บรักษาไว้ต่อ อาทิ ข้อมูลการติดต่อและเอกสารการจองจะเก็บรักษาตามระยะเวลาที่กฎหมายบัญชีและภาษีกำหนด ข้อมูลการใช้งานเว็บไซต์จะเก็บรักษาตามระยะเวลาที่ Google Analytics กำหนด และบันทึกการทำงานของระบบจะเก็บรักษาตามระยะเวลาที่ผู้ให้บริการโฮสติ้งกำหนด ส่วนการตั้งค่าความยินยอมของท่านจะถูกบันทึกไว้ในอุปกรณ์ของท่านจนกว่าท่านจะล้างข้อมูลเบราว์เซอร์',
      },
      {
        body: 'คุกกี้ (Cookies) มีไว้เพื่อช่วยให้การให้บริการต่างๆ บนเว็บไซต์แก่ท่านสะดวกขึ้น โดยคุกกี้คือไฟล์ข้อมูลขนาดเล็กที่ระบบคอมพิวเตอร์ของเราจะติดตั้งไว้ที่อุปกรณ์ของท่านเมื่อท่านเปิดเว็บไซต์ คุกกี้จะช่วยให้เว็บไซต์จดจำการตั้งค่าของท่าน แต่ไม่สามารถใช้ระบุตัวตนของท่านได้โดยตรง เว็บไซต์ของเราใช้คุกกี้ _ga และ _gid ของ Google Analytics เพื่อระบุตัวตนผู้ใช้ และคุกกี้ _fbp ของ Facebook เพื่อติดตามพฤติกรรมผู้ใช้จากโฆษณา โดยคุกกี้เหล่านี้จะถูกตั้งค่าเมื่อท่านได้ให้ความยินยอมเท่านั้น ส่วนการตั้งค่าความยินยอมจะถูกบันทึกไว้ใน Local Storage ของเบราว์เซอร์ ท่านสามารถเปลี่ยนแปลงการตั้งค่าได้ทุกเมื่อโดยกดปุ่ม "ตั้งค่า Cookie" ที่ด้านล่างของเว็บไซต์',
      },
      {
        body: 'หากท่านมีคำถาม ข้อเสนอแนะ หรือต้องการใช้สิทธิตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล เช่น สิทธิ์เข้าถึง แก้ไข ลบ คัดค้าน หรือถอนความยินยอมเกี่ยวกับข้อมูลของท่าน ท่านสามารถติดต่อเราได้ทางโทรศัพท์หมายเลข 099-632-6146 อีเมล everglowtravel@gmail.com หรือ LINE Official Account @Everglowtravel โดยเราจะดำเนินการตามคำขอโดยทั่วไปภายใน 30 วัน และหากเห็นว่าเราปฏิบัติไม่ถูกต้องตามกฎหมาย ท่านสามารถร้องเรียนต่อคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล (PDPC) ได้ที่ https://pdpc.th ทั้งนี้ เราดำเนินมาตรการที่เหมาะสมในการป้องกันข้อมูลส่วนบุคคลของท่านจากการสูญหาย การเข้าถึงโดยไม่ได้รับอนุญาต และการเปิดเผยโดยไม่ชอบด้วยกฎหมาย ตามมาตรา 37 แห่งพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562',
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    subtitle: 'Everglow Global Co., Ltd.',
    effectiveDate: 'Effective Date: August 17, 2026',
    sections: [
      {
        body: 'Everglow Global Co., Ltd. (Head Office), located at 25/163 Moo 4, Bang Phai, Mueang Nonthaburi, Nonthaburi, recognizes and respects your privacy and is committed to protecting the data we hold. This Policy has been established to control the use of, protect and conceal your data from third parties. It applies to the Website **www.everglowtravel.com**, where we collect only the data necessary, depending on the services you use, such as searching for and viewing tour details, and contacting us by phone, email or LINE Official Account. All of this is carried out in accordance with the Personal Data Protection Act B.E. 2562.',
      },
      {
        body: 'When you use the Website, certain usage data is collected automatically, such as your IP address and browser type. Your IP address is collected by the Website hosting provider. Device information such as device type, operating system and screen size, together with usage information such as the pages you visit and how you arrived at the Website, is collected only if you give your consent through the cookie banner. We will use your data in accordance with applicable laws and regulations, in order to improve and enhance our services.',
      },
      {
        body: 'We collect your personal data for the following purposes: (a) to make it convenient for you to contact us and for us to provide tour booking services; (b) to provide services and communicate through our LINE Official Account; (c) to answer your questions and resolve issues you report; (d) to measure interest in and satisfaction with our services through traffic analysis; (e) to use as a basis for developing new services that meet your needs, and to conduct marketing via Facebook; and (f) to comply with our legal obligations. Items (d) and (e) are carried out only with your consent, while items (a), (b), (c) and (f) are necessary for the performance of a contract or for compliance with legal obligations.',
      },
      {
        body: 'The data we hold may include information that identifies you, which we receive when you contact us by phone, email or LINE Official Account, such as your name, phone number, email address, LINE ID, and any messages or information you send us. This information will be treated as confidential. We do not sell or rent your personal data to unrelated third parties. However, in order to deliver our services, we disclose the necessary data to Google LLC (United States) for Website analytics, to Meta Platforms Inc. (United States) for Facebook marketing, to LINE Corporation (Japan) for communication via LINE, and to Vercel Inc. (United States) for Website hosting and system operation logs. Disclosure to Google LLC and Meta Platforms Inc. occurs only if you have given your consent.',
      },
      {
        body: 'We retain your data only as long as necessary for the purposes above, or until you request deletion, unless the law requires us to retain it longer. For example, contact information and booking documents are retained for the period required by accounting and tax law, Website usage data is retained for the period set by Google Analytics, and system operation logs are retained for the period set by the hosting provider. Your consent settings are stored on your device until you clear your browser storage.',
      },
      {
        body: 'Cookies are used to make the services on the Website more convenient for you. A cookie is a small data file that our computer system stores on your device when you open the Website. Cookies help the Website remember your preferences, but cannot identify you directly. We use the _ga and _gid cookies of Google Analytics to identify users, and the _fbp cookie of Facebook to track user behaviour from advertisements. These cookies are only set if you give your consent. Your consent settings themselves are stored in your browser Local Storage. You can change your preferences at any time by clicking the "Cookie Settings" button at the bottom of the Website.',
      },
      {
        body: 'If you have any questions, suggestions, or wish to exercise your rights under the Personal Data Protection Act, such as the right to access, correct, erase, object to the processing of, or withdraw consent for your data, please contact us on 099-632-6146, at everglowtravel@gmail.com, or via LINE Official Account @Everglowtravel. We will generally process your request within 30 days. If you believe we have not complied with the law, you may file a complaint with the Personal Data Protection Committee (PDPC) at https://pdpc.th. In doing so, we apply appropriate measures to protect your personal data against loss, unauthorized access and unlawful disclosure, in accordance with Section 37 of the Personal Data Protection Act B.E. 2562.',
      },
    ],
  },
};

function renderBody(text) {
  if (!text) return null;
  return String(text)
    .split(/(\*\*[^*]+\*\*)/g)
    .map((part, i) =>
      part.startsWith('**') && part.endsWith('**') ? (
        <strong key={i}>{part.slice(2, -2)}</strong>
      ) : (
        part
      ),
    );
}

function renderSection(section, index) {
  return (
    <div key={section.heading || index} className="privacy-section">
      {section.heading && <h2 className="privacy-section-heading">{section.heading}</h2>}
      {section.body && <p className="privacy-section-body">{renderBody(section.body)}</p>}
      {section.table && renderTable(section.table)}
      {section.footer && <p className="privacy-section-footer">{renderBody(section.footer)}</p>}
      {section.sub?.map((sub) => (
        <div key={sub.title} className="privacy-sub">
          <h3 className="privacy-sub-heading">{sub.title}</h3>
          {sub.body && <p className="privacy-sub-body">{renderBody(sub.body)}</p>}
          {sub.table && renderTable(sub.table)}
        </div>
      ))}
    </div>
  );
}

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