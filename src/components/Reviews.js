import { assetPath } from '@/lib/utils';
import reviews from '@/data/reviews.json';

export default function Reviews({ locale }) {
  const title = locale === 'en' ? 'Reviews' : 'รีวิว';
  return (
    <section className="reviews-section page">
      <h2>{title}</h2>
      {reviews.map((r, i) => (
        <div className="review-card" key={i}>
          <div className="review-img">
            <img src={assetPath(r.image)} alt="" />
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
