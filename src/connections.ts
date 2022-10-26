import { connection } from "@prismatic-io/spectral";

export const apiKey = connection({
  comments: "Authenticates requests to Seven using an API Key",
  inputs: {
    apiKey: {
      comments: "Your Seven API Key",
      example: "3x4mPl34pIk3y",
      label: "API Key",
      placeholder: "API Key",
      required: true,
      shown: true,
      type: "password",
    },
  },
  key: "apiKey",
  label: "Seven Credentials",
});

export default [apiKey];
