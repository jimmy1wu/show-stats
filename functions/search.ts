import { Handler } from "@netlify/functions";
import { execute } from "./lib/hasura";

export const handler: Handler = async (event, context) => {
  const { query } = event.queryStringParameters;

  const { data, errors } = await search(query);

  if (errors) {
    console.error(errors);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Something unexpected happened.",
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data.shows),
  };
};

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
