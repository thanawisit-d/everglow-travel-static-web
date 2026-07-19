import Image from 'next/image';
import Link from 'next/link';
import { assetPath } from '@/lib/assets';
import config from '@/data/site-config.json';

export default function ReviewDetail({ review, locale }) {
  if (!review) return null;
  const isEn = locale === 'en';
  const t = config[locale] || config.th;

  const displayTag = isEn && review.tag_en ? review.tag_en : review.tag;
  const displayText = isEn && review.text_en ? review.text_en : review.text;

  return (
    <div className="review-detail-page page active">
      <div className="page-hero-band">
        <nav className="breadcrumb">
          <Link href={`/${locale}`}>{t.home}</Link>
          <span className="breadcrumb-sep">/</span>
          <Link href={`/${locale}/reviews`}>{t.reviews}</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current" aria-current="page">{displayTag}</span>
        </nav>
      </div>
      <div className="review-detail-body">
        <div className="review-detail-image">
          <Image
            src={assetPath(review.image)}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            alt={displayTag}
            className="review-detail-image-img"
          />
        </div>
        <div className="review-detail-tag">{displayTag}</div>
        <p className="review-detail-text">{displayText}</p>
      </div>
    </div>
  );
}
