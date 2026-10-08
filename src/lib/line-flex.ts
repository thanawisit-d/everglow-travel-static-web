import type { messagingApi } from "@line/bot-sdk";
import type { Tour } from "@/types/tour";
import { tourCountryLabel } from "@/types/tour";
import { formatPrice } from "@/utils/price";
import { env } from "@/lib/env";

const SITE_URL = env.siteUrl.replace(/\/+$/, "");
const DEFAULT_IMAGE = "assets/images/logos/Logo.jpg";
const PRIMARY_COLOR = "#2563EB";

const THAI_MONTHS = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

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

  const year = Number(match[1]) + 543;
  const monthNumber = Number(match[2]);

  if (monthNumber < 1 || monthNumber > 12) {
    return null;
  }

  return {
    month: THAI_MONTHS[monthNumber - 1],
    year,
    key: value,
  };
}

/**
 * Travel period:
 * - Outbound: startMonth/endMonth
 * - Domestic: periodText
 */
function tourPeriodLabel(tour: Tour): string | null {
  const start = parseFlyMonth(tour.startMonth);

  if (!start) {
    return tour.periodText?.trim() || null;
  }

  const end = parseFlyMonth(tour.endMonth);

  if (!end || start.key === end.key) {
    return `${start.month} ${start.year}`;
  }

  if (start.year === end.year) {
    return `${start.month} – ${end.month} ${start.year}`;
  }

  return `${start.month} ${start.year} – ${end.month} ${end.year}`;
}

function hasCity(tour: Tour): boolean {
  return Boolean(tour.city && tour.city !== "-");
}

/**
 * Build a public image URL.
 *
 * encodeURI() preserves "/" while encoding spaces and other
 * characters that are not safe inside a URL.
 */
function tourImageUrl(tour: Tour): string {
  const image = tour.image || DEFAULT_IMAGE;

  if (image.startsWith("http")) {
    return encodeURI(image);
  }

  const imagePath = image.replace(/^\/+/, "");

  return `${SITE_URL}/${encodeURI(imagePath)}`;
}

function buildTitle(tour: Tour, locale: "th" | "en"): string {
  const titleName = tourCountryLabel(tour, locale);

  if (tour.type !== "outbound") {
    return titleName;
  }

  const thaiCountry = tourCountryLabel(tour, "th");
  const flag = COUNTRY_FLAGS[thaiCountry];

  return flag ? `${flag} ${titleName}` : titleName;
}

function buildAltText(tour: Tour, locale: "th" | "en"): string {
  const title = tourCountryLabel(tour, locale);
  const parts: string[] = [title];

  if (tour.type === "outbound" && hasCity(tour)) {
    parts.push(tour.city as string);
  }

  if (tour.duration) {
    parts.push(tour.duration);
  }

  const period = tourPeriodLabel(tour);

  if (period) {
    parts.push(period);
  }

  parts.push(`ราคา ${formatPrice(tour.price)} บาท`);

  return parts.join(" · ");
}

export function buildTourFlex(
  tour: Tour,
  locale: "th" | "en" = "th",
): messagingApi.FlexMessage {
  const title = buildTitle(tour, locale);
  const isOutbound = tour.type === "outbound";
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
      color: "#222222",
      wrap: true,
      maxLines: 2,
    },
  ];

  if (showCity) {
    bodyContents.push({
      type: "text",
      text: `📍 ${tour.city}`,
      size: "sm",
      color: "#555555",
      wrap: true,
      maxLines: 2,
    });
  }

  if (tour.duration) {
    bodyContents.push({
      type: "text",
      text: tour.duration,
      size: "sm",
      color: "#333333",
      wrap: true,
    });
  }

  if (period) {
    bodyContents.push({
      type: "text",
      text: `📅 ${period}`,
      size: "sm",
      color: "#666666",
      wrap: true,
      maxLines: 2,
    });
  }

  if (airline) {
    bodyContents.push({
      type: "text",
      text: `✈️ ${airline}`,
      size: "sm",
      color: "#666666",
      wrap: true,
      maxLines: 1,
    });
  }

  bodyContents.push({
    type: "box",
    layout: "vertical",
    margin: "md",
    spacing: "xs",
    contents: [
      {
        type: "text",
        text: priceLabel,
        size: "xs",
        color: "#8B8B8B",
      },
      {
        type: "text",
        text: `฿${formatPrice(tour.price)}`,
        weight: "bold",
        size: "xl",
        color: PRIMARY_COLOR,
        wrap: false,
      },
    ],
  });

  return {
    type: "flex",
    altText: buildAltText(tour, locale),
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
        paddingAll: "md",
        spacing: "sm",
        contents: bodyContents,
      },

      footer: {
        type: "box",
        layout: "vertical",
        paddingTop: "sm",
        paddingBottom: "md",
        paddingStart: "md",
        paddingEnd: "md",
        spacing: "xs",
        contents: [
          {
            type: "button",
            style: "primary",
            height: "sm",
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
            height: "sm",
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
  locale: "th" | "en" = "th",
): messagingApi.FlexMessage {
  if (tours.length === 0) {
    throw new Error("Cannot build carousel with zero tours.");
  }

  if (tours.length === 1) {
    return buildTourFlex(tours[0], locale);
  }

  const visibleTours = tours.slice(0, 5);

  const bubbles = visibleTours.map(
    (tour) => buildTourFlex(tour, locale).contents as messagingApi.FlexBubble,
  );

  return {
    type: "flex",
    altText: `พบ ${tours.length} โปรแกรมทัวร์ เลื่อนดูโปรแกรมที่สนใจได้เลย`,
    contents: {
      type: "carousel",
      contents: bubbles,
    },
  };
}