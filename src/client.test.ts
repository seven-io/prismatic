import { ConnectionError } from "@prismatic-io/spectral";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import { createSevenClient } from "./client";
import { apiKey } from "./connections";

describe("createSevenClient", () => {
  test("returns Seven client with API key secret credentials", () => {
    const connection = createConnection(apiKey, {});
    const client = createSevenClient({ connection });

    expect(client).toBeDefined();
  });

  test("throws error if invalid credentials provided", () => {
    try {
      const connection = createConnection(
        { inputs: {}, key: "fakeConnection", display: {description: "", label: ""} },
        {}
      );
      createSevenClient({ connection });
    } catch (e) {
      expect(e).toBeInstanceOf(ConnectionError);
    }
  });
});
