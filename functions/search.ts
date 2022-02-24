import { Handler } from "@netlify/functions";
import { execute } from "./lib/hasura";
import { withErrorHandler } from "./lib/middleware";

const baseHandler: Handler = async (event, context) => {
  const { query } = event.queryStringParameters;

  const { shows } = await search(query);

  return {
    statusCode: 200,
    body: JSON.stringify(shows),
  };
};

export const handler = withErrorHandler(baseHandler);

function search(query: string) {
  return execute({
    query: `
      query Search($query: String!) {
        shows(
          where: { title: { _ilike: $query } }
          limit: 25
        ) {
          imdbID
          title
          poster
          year
        }
      }    
    `,
    variables: { query: `${query}%` },
  });
}
