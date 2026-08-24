export default function SkipToContent({ href, locale = 'th' }) {
  return (
    <a href={href} className="skip-link">
      {locale === 'en' ? 'Skip to content' : 'ข้ามไปยังเนื้อหา'}
    </a>
  );
}
