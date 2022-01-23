import { Handler } from "@netlify/functions";
import { searchByString } from "./lib/omdb";

export const handler: Handler = async (event, context) => {
  const { query } = event.queryStringParameters;

  const data = await searchByString(query);

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
