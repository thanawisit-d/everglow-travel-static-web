import type { messagingApi } from "@line/bot-sdk";

export function buildQuickReply(): messagingApi.QuickReply {
  return {
    items: [
      {
        type: "action",
        action: {
          type: "message",
          label: "📅 โปรแกรมประจำเดือน",
          text: "โปรแกรมประจำเดือน",
        },
      },
      {
        type: "action",
        action: {
          type: "message",
          label: "💰 งบ 20,000–30,000",
          text: "งบ20000-30000",
        },
      },
      {
        type: "action",
        action: {
          type: "message",
          label: "✈️ โปรโมชันล่าสุด",
          text: "โปรโมชั่นล่าสุด",
        },
      },
      {
        type: "action",
        action: {
          type: "message",
          label: "📋 วิธีจองทัวร์",
          text: "วิธีจองทัวร์",
        },
      },
      {
        type: "action",
        action: {
          type: "message",
          label: "💬 ติดต่อเจ้าหน้าที่",
          text: "ติดต่อแอดมิน",
        },
      },
    ],
  };
}