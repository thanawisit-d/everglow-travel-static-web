import Image from 'next/image';
import { assetPath } from '@/lib/utils';
import reviews from '@/data/reviews.json';

export default function Reviews({ locale, standalone }) {
  const title = locale === 'en' ? 'Reviews' : 'รีวิว';
  const isEn = locale === 'en';
  return (
    <section className="reviews-section page">
      {standalone ? <h1>{title}</h1> : <h2>{title}</h2>}
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