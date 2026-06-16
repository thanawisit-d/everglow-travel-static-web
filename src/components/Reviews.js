import { assetPath } from '@/lib/utils';

const reviews = [
  { name: 'คุณสมชาย', stars: 5, text: 'บริการดีมาก ทัวร์สนุก ตรงตามโปรแกรม', image: 'reviews_pic/review1.jpg' },
  { name: 'คุณวันดี', stars: 5, text: 'ประทับใจการบริการของไกด์มาก', image: 'reviews_pic/review2.jpg' },
  { name: 'คุณวิชัย', stars: 4, text: 'คุ้มค่า คุ้มราคา', image: 'reviews_pic/review3.jpg' },
  { name: 'คุณมานี', stars: 5, text: 'ทัวร์ญี่ปุ่นประทับใจมาก', image: 'reviews_pic/review4.jpg' },
];

export default function Reviews() {
  return (
    <section className="page reviews-page">
      <h2>รีวิวจากลูกค้า</h2>
      <div className="reviews-grid">
        {reviews.map((r, i) => (
          <div className="review-card" key={i}>
            <img src={assetPath(r.image)} alt={r.name} />
            <h4>{r.name}</h4>
            <div className="stars">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</div>
            <p>{r.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
