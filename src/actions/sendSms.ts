import { action, util } from "@prismatic-io/spectral";
import { SmsResponse, SmsResource, SmsParams } from "@seven.io/client";
import { createSevenClient } from "../client";
import { connectionInput, text, to } from "../inputs";

interface Response {
  data: SmsResponse;
}

const examplePayload: Response = {
  data: {
    balance: 112.57,
    debug: "true",
    messages: [
      {
        encoding: "gsm",
        error: null,
        error_text: null,
        id: null,
        is_binary: false,
        label: null,
        parts: 1,
        price: 0,
        recipient: "491771783130",
        sender: "491771783130",
        success: true,
        text: "hi",
        udh: null,
      },
    ],
    sms_type: "direct",
    success: "100",
    total_price: 0,
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
  perform: async (_context, params) => {
    const client = createSevenClient({
      connection: params.sevenConnection,
    });
    const smsParams: SmsParams = {
      text: util.types.toString(params.text),
      to: util.types.toString(params.to).split(','),
    };
    return {
      data: await (new SmsResource(client)).dispatch(smsParams),
    };
  },
});

export default sendSms;
