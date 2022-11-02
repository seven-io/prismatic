import { action, util } from "@prismatic-io/spectral";
import { VoiceParams, VoiceJsonResponse } from "sms77-client";
import { createSevenClient } from "../client";
import { connectionInput, text, to } from "../inputs";

interface Response {
  data: VoiceJsonResponse;
}

const examplePayload: Response = {
  data: {
    balance: 112.57,
    debug: true,
    messages: [
      {
        error: null,
        error_text: null,
        id: null,
        price: 0,
        recipient: "491771783130",
        sender: "491771783130",
        success: true,
        text: "hi",
      },
    ],
    success: "100",
    total_price: 0,
  },
};

export const ttsCall = action({
  display: {
    label: "Make Text-To-Speech Call",
    description:
      "Convert text to speech, call given phone number and read the message out loud.",
  },
  examplePayload,
  inputs: {
    sevenConnection: connectionInput,
    text,
    to,
  },
  perform: async (context, params) => {
    const client = createSevenClient({
      connection: params.sevenConnection,
    });
    const voiceParams: VoiceParams = {
      json: true,
      text: util.types.toString(params.text),
      to: util.types.toString(params.to),
    };

    return {
      data: await client.voice(voiceParams),
    };
  },
});

export default ttsCall;
