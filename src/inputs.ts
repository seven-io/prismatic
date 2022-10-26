import { input } from "@prismatic-io/spectral";

export const connectionInput = input({
  label: "Connection",
  required: true,
  type: "connection",
});

export const text = input({
  comments: "Provide a string for the message you would like to send.",
  label: "Message",
  required: true,
  type: "string",
});

export const to = input({
  comments: "Provide a phone number to receive your message.",
  example: "+491771783130",
  label: "Phone Number",
  required: true,
  type: "string",
});
