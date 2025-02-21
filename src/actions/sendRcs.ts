import { action, util } from "@prismatic-io/spectral";
import { RcsResource, RcsDispatchParams, RcsDispatchResponse } from "@seven.io/client";
import { createSevenClient } from "../client";
import { connectionInput, text, to } from "../inputs";

interface Response {
  data: RcsDispatchResponse;
}

const examplePayload: Response = {
  data: {
    balance: 124.2,
    debug: "true",
    messages: [
      {
        channel: "RCS",
        encoding: null,
        error: "Invalid data",
        error_text: "Unknown error.",
        fallback: null,
        id: null,
        is_binary: null,
        label: null,
        parts: 1,
        price: 0,
        recipient: "491716992343",
        sender: "testersinc_3888FC35",
        success: false,
        text: null,
        udh: null,
      }
    ],
    sms_type: "direct",
    success: "100",
    total_price: 0,
  },
};

export const sendRcs = action({
  display: {
    label: "Send RCS",
    description: "Dispatch an RCS via seven",
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
    const rcsDispatchParams: RcsDispatchParams = {
      text: util.types.toString(params.text),
      to: util.types.toString(params.to),
    };
    return {
      data: await (new RcsResource(client)).dispatch(rcsDispatchParams),
    };
  },
});

export default sendRcs;
