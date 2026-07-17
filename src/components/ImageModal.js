'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';

export default function ImageModal({ src, alt, hintLabel = 'ดูภาพขยาย' }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const closeBtnRef = useRef(null);

  const close = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    closeBtnRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, close]);

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        className="image-modal-trigger"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="image-modal-thumb"
          sizes="(max-width: 768px) 100vw, 420px"
        />
        <span className="image-modal-hint">
          <ZoomIn size={16} strokeWidth={2.5} />
          {hintLabel}
        </span>
      </button>

      {isOpen && (
        <div
          className="image-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={close}
        >
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              ref={closeBtnRef}
              className="image-modal-close"
              onClick={close}
              aria-label="Close"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} className="image-modal-full" />
          </div>
        </div>
      )}
    </>
  );
}
