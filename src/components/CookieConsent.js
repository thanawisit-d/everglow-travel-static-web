'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';
import config from '@/data/site-config.json';

const CONSENT_KEY = 'everglow_consent';
const CONSENT_VERSION = '1.0';

function readConsent() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data && data.version === CONSENT_VERSION) return data;
    return null;
  } catch {
    return null;
  }
}

function writeConsent(data) {
  const record = { ...data, timestamp: new Date().toISOString(), version: CONSENT_VERSION };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
  return record;
}

export default function CookieConsent({ lang, onConsent }) {
  const t = config[lang] || config.th;
  const [mounted, setMounted] = useState(false);
  const [forceOpen, setForceOpen] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const consentRef = readConsent();
  const visible = mounted && (consentRef == null || forceOpen);

  useEffect(() => {
    if (consentRef) {
      onConsent?.({ analytics: consentRef.analytics, marketing: consentRef.marketing });
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const handler = () => {
      const existing = readConsent();
      if (existing) {
        setAnalytics(existing.analytics);
        setMarketing(existing.marketing);
      }
      setForceOpen(true);
      setShowPrefs(true);
    };
    window.addEventListener('open-cookie-consent', handler);
    return () => window.removeEventListener('open-cookie-consent', handler);
  }, []);

  const save = useCallback((a, m) => {
    const record = writeConsent({ analytics: a, marketing: m });
    onConsent?.({ analytics: record.analytics, marketing: record.marketing });
    setShowPrefs(false);
    setForceOpen(false);
  }, [onConsent]);

  const handleAcceptAll = () => save(true, true);
  const handleRejectAll = () => save(false, false);
  const handleSavePrefs = () => save(analytics, marketing);

  if (!visible) return null;

  return (
    <div className="cc-banner" role="dialog" aria-label={t.cookieConsentTitle}>
      <div className="cc-inner">
        {!showPrefs ? (
          <>
            <div className="cc-header">
              <span className="cc-icon"><Cookie size={20} strokeWidth={2} /></span>
              <div>
                <h2 className="cc-title">{t.cookieConsentTitle}</h2>
                <p className="cc-desc">
                  {t.cookieConsentDesc}{' '}
                  <Link href={`/${lang}/privacy`}>{t.learnMore}</Link>
                </p>
              </div>
            </div>
            <div className="cc-actions">
              <button type="button" onClick={handleRejectAll} className="cc-btn cc-btn-reject">
                {t.rejectAll}
              </button>
              <button type="button" onClick={() => setShowPrefs(true)} className="cc-btn-manage">
                {t.managePrefs}
              </button>
              <button type="button" onClick={handleAcceptAll} className="cc-btn cc-btn-accept">
                {t.acceptAll}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="cc-prefs">
              <div className="cc-header">
                <span className="cc-icon"><Cookie size={20} strokeWidth={2} /></span>
                <h2 className="cc-prefs-title">{t.managePrefs}</h2>
              </div>

              <div className="cc-pref-row">
                <div className="cc-pref-info">
                  <div className="cc-pref-label">{t.analyticsLabel}</div>
                  <div className="cc-pref-desc">{t.analyticsDesc}</div>
                </div>
                <button
                  role="switch"
                  aria-checked={analytics}
                  onClick={() => setAnalytics(!analytics)}
                  className="cc-toggle"
                >
                  <span className="cc-toggle-knob" />
                </button>
              </div>

              <div className="cc-pref-row">
                <div className="cc-pref-info">
                  <div className="cc-pref-label">{t.marketingLabel}</div>
                  <div className="cc-pref-desc">{t.marketingDesc}</div>
                </div>
                <button
                  role="switch"
                  aria-checked={marketing}
                  onClick={() => setMarketing(!marketing)}
                  className="cc-toggle"
                >
                  <span className="cc-toggle-knob" />
                </button>
              </div>
            </div>

            <div className="cc-prefs-actions">
              <button type="button" onClick={handleRejectAll} className="cc-btn cc-btn-reject">
                {t.rejectAll}
              </button>
              <button type="button" onClick={handleSavePrefs} className="cc-btn cc-btn-accept">
                {t.savePrefs}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
