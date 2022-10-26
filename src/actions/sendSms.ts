import { action, util } from "@prismatic-io/spectral";
import { SmsJsonResponse, SmsParams } from "sms77-client";
import { createSevenClient } from "../client";
import { connectionInput, text, to } from "../inputs";

interface Response {
  data: SmsJsonResponse;
}

const examplePayload: Response = {
  data: {
    success: "100",
    total_price: 0,
    balance: 112.57,
    debug: "true",
    sms_type: "direct",
    messages: [
      {
        id: null,
        sender: "491771783130",
        recipient: "491771783130",
        text: "hi",
        encoding: "gsm",
        label: null,
        parts: 1,
        udh: null,
        is_binary: false,
        price: 0,
        success: true,
        error: null,
        error_text: null,
      },
    ],
  },
};

export const sendSms = action({
  display: {
    label: "Send SMS",
    description: "Dispatch an SMS via seven",
  },
  examplePayload,
  inputs: {
    sevenConnection: connectionInput,
    text,
    to,
  },
  perform: async (context, params) => {
    const client = await createSevenClient({
      connection: params.sevenConnection,
    });
    const smsParams: SmsParams = {
      json: true,
      text: util.types.toString(params.text),
      to: util.types.toString(params.to),
    };
    return {
      data: await client.sms(smsParams),
    };
  },
});

export default sendSms;
