import { component } from "@prismatic-io/spectral";
import sendSms from "./actions/sendSms";
import { apiKey } from "./connections";

export default component({
  actions: {
    sendSms,
  },
  connections: [apiKey],
  display: {
    category: "Data Platforms",
    description: "Consumes the seven API",
    iconPath: "icon.png",
    label: "Seven",
  },
  documentationUrl: "https://docs.seven.io/third-party-solutions/prismatic/",
  key: "seven",
  public: true,
});
