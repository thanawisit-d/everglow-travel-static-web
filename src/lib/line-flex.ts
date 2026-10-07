import type { messagingApi } from "@line/bot-sdk";
import type { Tour } from "@/types/tour";
import { tourCountryLabel } from "@/types/tour";
import { formatPrice } from "@/utils/price";
import { env } from "@/lib/env";

const SITE_URL = env.siteUrl;
const DEFAULT_IMAGE = "assets/images/logos/Logo.jpg";
const PRIMARY_COLOR = "#2563EB";

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

// Flag prefix shown on the card title for outbound destinations.
const COUNTRY_FLAGS: Record<string, string> = {
  "จีน": "🇨🇳",
  "ญี่ปุ่น": "🇯🇵",
  "เกาหลีใต้": "🇰🇷",
  "เกาหลี": "🇰🇷",
  "ไต้หวัน": "🇹🇼",
  "ฮ่องกง": "🇭🇰",
  "มาเก๊า": "🇲🇴",
  "เวียดนาม": "🇻🇳",
  "ภูฏาน": "🇧🇹",
  "โปรตุเกส": "🇵🇹",
  "สเปน": "🇪🇸",
  "อิตาลี": "🇮🇹",
  "ฝรั่งเศส": "🇫🇷",
  "ตุรกี": "🇹🇷",
  "อียิปต์": "🇪🇬",
  "ออสเตรเลีย": "🇦🇺",
  "อินเดีย": "🇮🇳",
  "สิงคโปร์": "🇸🇬",
  "มาเลเซีย": "🇲🇾",
};

function airlineName(filename: string): string {
  return AIRLINE_NAMES[filename] || filename.replace(/\.[^.]+$/, "");
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

// Travel period label. Outbound tours carry startMonth/endMonth, while
// domestic tours only carry a pre-formatted periodText — fall back to it so
// domestic cards still show a period instead of nothing.
function tourPeriodLabel(tour: Tour): string | null {
  const start = parseFlyMonth(tour.startMonth);
  if (!start) return tour.periodText?.trim() || null;

  const end = parseFlyMonth(tour.endMonth);
  if (!end || start.key === end.key) return `${start.month} ${start.year}`;

  return end.year === start.year
    ? `${start.month} – ${end.month} ${start.year}`
    : `${start.month} ${start.year} – ${end.month} ${end.year}`;
}

function hasCity(tour: Tour): boolean {
  return Boolean(tour.city) && tour.city !== "-";
}

function tourImageUrl(tour: Tour): string {
  return `${SITE_URL}/${tour.image || DEFAULT_IMAGE}`;
}

export function buildTourFlex(
  tour: Tour,
  locale: "th" | "en" = "th"
): messagingApi.FlexMessage {
  const titleName = tourCountryLabel(tour, locale);
  const isOutbound = tour.type === "outbound";
  const flag = isOutbound ? COUNTRY_FLAGS[tourCountryLabel(tour, "th")] : undefined;
  const title = flag ? `${flag} ${titleName}` : titleName;

  const period = tourPeriodLabel(tour);
  const airline = tour.airline ? airlineName(tour.airline) : null;
  const showCity = isOutbound && hasCity(tour);
  const priceLabel = isOutbound ? "ราคาเริ่มต้น" : "ราคา";

  const bodyContents: messagingApi.FlexComponent[] = [
    {
      type: "text",
      text: title,
      weight: "bold",
      size: "xl",
      wrap: true,
      maxLines: 2,
    },
  ];

  if (showCity) {
    bodyContents.push({
      type: "text",
      text: `📍 ${tour.city}`,
      size: "sm",
      color: "#666666",
      wrap: true,
    });
  }

  bodyContents.push({
    type: "text",
    text: tour.duration,
    size: "sm",
    color: "#333333",
    wrap: true,
  });

  if (period) {
    bodyContents.push({
      type: "text",
      text: `📅 ${period}`,
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

  bodyContents.push({
    type: "box",
    layout: "vertical",
    margin: "lg",
    spacing: "xs",
    contents: [
      {
        type: "text",
        text: priceLabel,
        size: "xs",
        color: "#8b8b8b",
      },
      {
        type: "text",
        text: `฿${formatPrice(tour.price)}`,
        weight: "bold",
        size: "xxl",
        color: PRIMARY_COLOR,
      },
    ],
  });

  const altParts: string[] = [titleName];
  if (showCity) altParts.push(tour.city as string);
  altParts.push(tour.duration);
  if (period) altParts.push(period);
  altParts.push(`ราคา ${formatPrice(tour.price)} บาท`);

  return {
    type: "flex",
    altText: altParts.join(" · "),
    contents: {
      type: "bubble",
      hero: {
        type: "image",
        url: tourImageUrl(tour),
        size: "full",
        aspectRatio: "2:1",
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
            color: PRIMARY_COLOR,
            action: {
              type: "uri",
              label: "ดูรายละเอียดทัวร์",
              uri: `${SITE_URL}/${locale}/tours/${tour.id}`,
            },
          },
          {
            type: "button",
            style: "link",
            action: {
              type: "message",
              label: "สอบถามทัวร์",
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
    throw new Error("Cannot build carousel with zero tours.");
  }

  if (tours.length === 1) {
    return buildTourFlex(tours[0], locale);
  }

  const bubbles = tours
    .slice(0, 5)
    .map((tour) => buildTourFlex(tour, locale).contents as messagingApi.FlexBubble);

  return {
    type: "flex",
    altText: `พบ ${tours.length} โปรแกรมทัวร์ เลื่อนดูโปรแกรมที่สนใจได้เลย`,
    contents: {
      type: "carousel",
      contents: bubbles,
    },
  };
}