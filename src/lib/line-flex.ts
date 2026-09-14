import type { messagingApi } from "@line/bot-sdk";
import type { Tour } from "@/types/tour";
import { tourCountryLabel } from "@/types/tour";
import { formatPrice } from "@/utils/price";

const SITE_URL = "https://everglow-travel-static-web.vercel.app";
const DEFAULT_IMAGE = "assets/images/logos/Logo.jpg";

const THAI_MONTHS = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
  "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
  "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];

// Map airline logo filenames back to human-readable airline names.
const AIRLINE_NAMES: Record<string, string> = {
  "Cathaylogo.jpg": "Cathay Pacific",
  "airasia.png": "AirAsia X",
  "VietJet.png": "VietJet Air",
  "SichuanAirlines.png": "Sichuan Airlines",
  "ChinaEastern.png": "China Eastern",
  "9Air.png": "9 Air",
  "spring.png": "Spring Airlines",
  "ShandongAirlines.png": "Shandong Airlines",
  "ANA.avif": "ANA",
  "JejuAir.png": "Jeju Air",
  "AsianaAirlines.png": "Asiana Airlines",
  "Emirates.png": "Emirates",
  "VietnamAirlines.png": "Vietnam Airlines",
  "ThaiLionAir.png": "Thai Lion Air",
  "HongKongAirlines.svg": "Hong Kong Airlines",
  "ThaiAirways.png": "Thai Airways",
  "QatarAirways.png": "Qatar Airways",
  "OmanAir.png": "Oman Air",
  "SingaporeAirlines.png": "Singapore Airlines",
  "TurkishAirlines.svg": "Turkish Airlines",
  "Condor.png": "Condor",
  "EtihadAirways.png": "Etihad Airways",
  "PhilippineAirlines.png": "Philippine Airlines",
  "Qantas.png": "Qantas",
  "MyanmarNationalAirlines.png": "Myanmar National Airlines",
  "CebuPacific.png": "Cebu Pacific",
  "AirIndia.png": "Air India",
  "BhutanAirlines.png": "Bhutan Airlines",
  "RoyalJordanian.png": "Royal Jordanian",
  "ITAAirways.png": "ITA Airways",
};

function airlineName(filename: string): string {
  return AIRLINE_NAMES[filename] || filename.replace(/\.[^.]+$/, "");
}

// "2026-04" / "2026-05" --> "เมษายน – พฤษภาคม 2569" (Buddhist year)
function travelMonthLabel(tour: Tour): string | null {
  const start = parseFlyMonth(tour.startMonth);
  if (!start) return null;
  const end = parseFlyMonth(tour.endMonth);

  if (!end) return `📅 เดินทาง ${start.month} ${start.year}`;
  if (start.key === end.key) return `📅 เดินทาง ${start.month} ${start.year}`;

  return end.year === start.year
    ? `📅 เดินทาง ${start.month} – ${end.month} ${start.year}`
    : `📅 เดินทาง ${start.month} ${start.year} – ${end.month} ${end.year}`;
}

function parseFlyMonth(
  value: string | undefined,
): { month: string; year: number; key: string } | null {
  if (!value) return null;
  const match = value.match(/^(\d{4})-(\d{1,2})$/);
  if (!match) return null;
  const year = Number(match[1]) + 543; // Buddhist calendar
  const m = Number(match[2]);
  if (m < 1 || m > 12) return null;
  return { month: THAI_MONTHS[m - 1], year, key: value };
}

function hasCity(tour: Tour): boolean {
  return Boolean(tour.city) && tour.city !== "-";
}

function tourImageUrl(tour: Tour): string {
  if (tour.image?.startsWith("http")) return tour.image;
  const image = tour.image || DEFAULT_IMAGE;
  return `${SITE_URL}/${image.replace(/^\/+/, "")}`;
}

export function buildTourFlex(
  tour: Tour,
  locale: "th" | "en" = "th"
): messagingApi.FlexMessage {

  const title = tourCountryLabel(tour, locale);
  const siteUrl = "https://everglow-travel-static-web.vercel.app";
  const month = travelMonthLabel(tour);
  const airline = tour.airline ? airlineName(tour.airline) : null;

  const bodyContents: messagingApi.FlexComponent[] = [
    {
      type: "text",
      text: title,
      weight: "bold",
      size: "xl",
      wrap: true,
    },
  ];

  if (month) {
    bodyContents.push({
      type: "text",
      text: month,
      size: "sm",
      color: "#666666",
      wrap: true,
    });
  }

  if (airline) {
    bodyContents.push({
      type: "text",
      text: `✈️ ${airline}`,
      size: "sm",
      color: "#666666",
      wrap: true,
    });
  }

  if (hasCity(tour)) {
    bodyContents.push({
      type: "box",
      layout: "baseline",
      spacing: "sm",
      contents: [
        {
          type: "text",
          text: "📍",
          flex: 0,
          size: "sm",
        },
        {
          type: "text",
          text: tour.city as string,
          size: "sm",
          color: "#666666",
          wrap: true,
        },
      ],
    });
  }

  bodyContents.push(
    {
      type: "text",
      text: tour.duration,
      size: "sm",
      color: "#333333",
    },
    {
      type: "box",
      layout: "vertical",
      spacing: "sm",
      contents: [
        {
          type: "text",
          text: "ราคาเริ่มต้น",
          size: "xs",
          color: "#8b8b8b",
          wrap: true,
        },
        {
          type: "text",
          text: `฿${formatPrice(tour.price)}`,
          weight: "bold",
          size: "xxl",
          color: "#2563EB",
        },
      ],
    },
  );

  return {
    type: "flex",
    altText: `${title} (${tour.duration}) ราคา ${formatPrice(tour.price)} บาท`,
    contents: {
      type: "bubble",
      hero: {
        type: "image",
        url: tourImageUrl(tour),
        size: "full",
        aspectRatio: "20:13",
        aspectMode: "cover",
      },
      body: {
        type: "box",
        layout: "vertical",
        spacing: "md",
        contents: bodyContents,
      },
      footer: {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        contents: [
          {
            type: "button",
            style: "primary",
            color: "#2563EB",
            action: {
              type: "uri",
              label: "ดูรายละเอียด",
              uri: `${siteUrl}/${locale}/tours/${tour.id}`,
            },
          },
          {
            type: "button",
            style: "secondary",
            action: {
              type: "message",
              label: "สอบถามแอดมิน",
              text: `สนใจทัวร์ ${tour.id}`,
            },
          },
        ],
      },
    },
  };
}

export function buildTourCarousel(
  tours: Tour[],
  locale: "th" | "en" = "th"
): messagingApi.FlexMessage {
  if (tours.length === 0) {
    throw new Error('Cannot build carousel with zero tours.');
  }

  if (tours.length === 1) {
    return buildTourFlex(tours[0], locale);
  }

  const bubbles = tours
    .slice(0, 5)
    .map((tour) => buildTourFlex(tour, locale).contents as messagingApi.FlexBubble);

  return {
    type: "flex",
    altText: `พบทัวร์ ${tours.length} รายการ`,
    contents: {
      type: "carousel",
      contents: bubbles,
    },
  };
}