'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function TourProgram({ itinerary, locale }) {
  const [openDay, setOpenDay] = useState(null);
  const isEn = locale === 'en';

  if (!itinerary || !itinerary.length) return null;

  const toggle = (day) => {
    setOpenDay((prev) => (prev === day ? null : day));
  };

  return (
    <section className="tour-program">
      <h2 className="tour-program__heading">
        {isEn ? 'Tour Program' : 'โปรแกรมทัวร์'}
      </h2>
      <div className="tour-program__list">
        {itinerary.map((day) => {
          const isOpen = openDay === day.day;
          const dayTitle = isEn && day.title_en ? day.title_en : day.title;

          return (
            <div
              key={day.day}
              className={`tour-program__item${isOpen ? ' tour-program__item--open' : ''}`}
            >
              <button
                className="tour-program__header"
                onClick={() => toggle(day.day)}
                aria-expanded={isOpen}
                aria-controls={`tour-program-day-${day.day}`}
              >
                <span className="tour-program__day-label">
                  {isEn ? `Day ${day.day}` : `วัน ${day.day}`}
                </span>
                <span className="tour-program__divider" aria-hidden="true" />
                <span className="tour-program__summary">{dayTitle}</span>
                <ChevronDown
                  className={`tour-program__chevron${isOpen ? ' tour-program__chevron--open' : ''}`}
                  size={20}
                  aria-hidden="true"
                />
              </button>
              <div
                id={`tour-program-day-${day.day}`}
                className="tour-program__content"
                role="region"
              >
                <div className="tour-program__items">
                  {day.items?.map((item, idx) => (
                    <div key={idx} className="tour-program__row">
                      <span className="tour-program__time">
                        {isEn && item.time_en ? item.time_en : item.time}
                      </span>
                      <span className="tour-program__desc">
                        {isEn && item.description_en ? item.description_en : item.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
