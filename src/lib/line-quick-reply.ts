import type { messagingApi } from "@line/bot-sdk";

export function buildQuickReply(): messagingApi.QuickReply {
  return {
    items: [
      {
        type: "action",
        action: {
          type: "message",
          label: "🇯🇵 ญี่ปุ่น",
          text: "ญี่ปุ่น",
        },
      },
      {
        type: "action",
        action: {
          type: "message",
          label: "🇰🇷 เกาหลี",
          text: "เกาหลี",
        },
      },
      {
        type: "action",
        action: {
          type: "message",
          label: "🇹🇼 ไต้หวัน",
          text: "ไต้หวัน",
        },
      },
      {
        type: "action",
        action: {
          type: "message",
          label: "🇹🇭 ไทย",
          text: "ไทย",
        },
      },
      {
        type: "action",
        action: {
          type: "message",
          label: "💰 โปรโมชั่น",
          text: "โปรโมชั่น",
        },
      },
      {
        type: "action",
        action: {
          type: "message",
          label: "📞 ติดต่อแอดมิน",
          text: "ติดต่อ",
        },
      },
    ],
  };
}