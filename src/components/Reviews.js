import Image from 'next/image';
import { assetPath } from '@/lib/utils';
import reviews from '@/data/reviews.json';
import config from '@/data/site-config.json';

export default function Reviews({ locale, standalone }) {
  const t = config[locale] || config.th;
  const isEn = locale === 'en';
  return (
    <section className="reviews-section page">
      {standalone ? <h1>{t.reviewTitle}</h1> : <h2>{t.reviewTitle}</h2>}
      {reviews.map((r) => (
        <div className="review-card" key={r.image}>
          <div className="review-img">
            <Image src={assetPath(r.image)} fill sizes="(max-width: 992px) 100vw, 400px" alt={isEn && r.tag_en ? r.tag_en : r.tag} />
          </div>
          <div className="review-content">
            <div className="tag">{isEn && r.tag_en ? r.tag_en : r.tag}</div>
            <p>{isEn && r.text_en ? r.text_en : r.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
