'use client';

import { useReducer, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { formatPrice } from '@/lib/pricing';
import { assetPath } from '@/lib/assets';
import { readRecentlyViewed, clearRecentlyViewed } from '@/lib/recentlyViewed';
import config from '@/data/site-config.json';

const subscribe = () => () => {};
const getSnapshot = () => readRecentlyViewed();
const getServerSnapshot = () => [];

export default function RecentlyViewed({ locale }) {
  const router = useRouter();
  const [, bump] = useReducer((x) => x + 1, 0);
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const t = config[locale] || config.th;

  if (items.length === 0) return null;

  const displayDesc = (item) => (locale === 'en' ? item.desc_en : item.desc) || item.id;

  return (
    <section className="recently-viewed" aria-label={t.recentlyViewed}>
      <div className="recently-viewed-head">
        <h2>{t.recentlyViewed}</h2>
        <button
          type="button"
          className="recently-viewed-clear"
          onClick={() => { clearRecentlyViewed(); bump(); }}
        >
          {t.recentlyClear}
        </button>
      </div>
      <div className="recently-viewed-track">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className="recently-viewed-item"
            onClick={() => router.push(`/${locale}/tours/${item.id}`)}
            aria-label={displayDesc(item)}
          >
            <div className="recently-viewed-img">
              <Image src={assetPath(item.image)} fill sizes="90px" alt="" />
            </div>
            <div className="recently-viewed-body">
              <span className="recently-viewed-code">{item.id}</span>
              <p className="recently-viewed-desc">{displayDesc(item)}</p>
              <span className="recently-viewed-price">{formatPrice(item.price)}.-</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
