'use client';

export default function TourCardSkeleton() {
  return (
    <div className="tour-card-skeleton" aria-hidden="true">
      <div className="skel-img" />
      <div className="skel-body">
        <div className="skel-badge" />
        <div className="skel-code" />
        <div className="skel-text skel-text--long" />
        <div className="skel-text skel-text--short" />
        <div className="skel-info">
          <div className="skel-chip" />
          <div className="skel-chip" />
        </div>
      </div>
      <div className="skel-bottom">
        <div className="skel-airline" />
        <div className="skel-price">
          <div className="skel-price-sub" />
          <div className="skel-price-main" />
        </div>
      </div>
    </div>
  );
}
