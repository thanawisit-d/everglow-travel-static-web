import Image from 'next/image';
import { assetPath } from '@/lib/utils';
import reviews from '@/data/reviews.json';

export default function Reviews({ locale }) {
  const title = locale === 'en' ? 'Reviews' : 'รีวิว';
  return (
    <section className="reviews-section page">
      <h1>{title}</h1>
      {reviews.map((r) => (
        <div className="review-card" key={r.image}>
          <div className="review-img">
            <Image src={assetPath(r.image)} fill sizes="(max-width: 992px) 100vw, 400px" alt={r.tag} />
          </div>
          <div className="review-content">
            <div className="tag">{r.tag}</div>
            <p>{r.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}