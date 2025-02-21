import {Client} from "@seven.io/client";
import { Connection, ConnectionError, util } from "@prismatic-io/spectral";

interface ClientProps {
  connection: Connection;
}

export const createSevenClient = ({ connection }: ClientProps): Client => {
  if (connection.key !== "apiKey") {
    throw new ConnectionError(
      connection,
      `Unsupported connection method ${connection.key}.`
    );
  }

  const apiKey = util.types.toString(connection.fields.apiKey).trim();
  return new Client({apiKey, sentWith: 'Prismatic'});
};
