import type { messagingApi } from "@line/bot-sdk";
import type { Tour } from "@/types/tour";
import { tourCountryLabel } from "@/types/tour";
import { formatPrice } from "@/utils/price";

const SITE_URL = "https://everglow-travel-static-web.vercel.app";
const DEFAULT_IMAGE = "assets/images/logos/Logo.jpg";

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
        contents: [
          {
            type: "text",
            text: title,
            weight: "bold",
            size: "xl",
            wrap: true,
          },
          {
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
                text: tour.city || "-",
                size: "sm",
                color: "#666666",
                wrap: true,
              },
            ],
          },
          {
            type: "text",
            text: tour.duration,
            size: "sm",
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
              uri: `${siteUrl}/tours/${tour.id}`,
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
    throw new Error("buildTourCarousel: no tours provided");
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
