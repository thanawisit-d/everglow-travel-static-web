import Image from 'next/image';
import { assetPath } from '@/lib/assets';
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
            <div className="review-text-wrap">
              <svg className="review-quote" viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
              </svg>
              <p>{isEn && r.text_en ? r.text_en : r.text}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
