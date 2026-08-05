'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Phone } from 'lucide-react';
import { assetPath } from '@/lib/assets';
import config from '@/data/site-config.json';

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const locale = pathname?.startsWith('/en') ? 'en' : 'th';
  const isEn = locale === 'en';
  const t = config[locale] || config.th;
  const s = config.social || {};
  const phoneDigits = (s.phone || '+66996326146').replace(/[^0-9+]/g, '');
  const lineHref = s.line || 'https://lin.ee/xXcNI1w';
  const closeLabel = isEn ? 'Close contact menu' : 'ปิดเมนูติดต่อ';

  const actions = [
    {
      key: 'call',
      href: `tel:${phoneDigits}`,
      className: 'floating-contact-action--call',
      label: t.detailCall,
      external: false,
      content: <Phone size={20} />,
    },
    {
      key: 'facebook',
      href: s.facebook,
      className: 'floating-contact-action--fb',
      label: 'Facebook',
      external: true,
      content: <Image src={assetPath('assets/images/social/Facebook.png')} width={22} height={22} alt="" />,
    },
    {
      key: 'instagram',
      href: s.instagram,
      className: 'floating-contact-action--ig',
      label: 'Instagram',
      external: true,
      content: <Image src={assetPath('assets/images/social/ig.png')} width={22} height={22} alt="" />,
    },
  ];

  return (
    <div className="floating-contact">
      {open && (
        <div className="floating-contact-actions">
          {actions.map((a) => (
            <a
              key={a.key}
              href={a.href}
              className={`floating-contact-action ${a.className}`}
              target={a.external ? '_blank' : undefined}
              rel={a.external ? 'noopener noreferrer' : undefined}
              aria-label={a.label}
              onClick={() => setOpen(false)}
            >
              {a.content}
              <span>{a.label}</span>
            </a>
          ))}
        </div>
      )}
      <button
        type="button"
        className={`floating-contact-fab${open ? ' is-open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? closeLabel : t.detailLine}
        aria-expanded={open}
      >
        <Image src={assetPath('assets/images/social/LINE.png')} width={30} height={30} alt="" />
      </button>
    </div>
  );
}
