import { Handler } from "@netlify/functions";
import { execute } from "./lib/hasura";

export const handler: Handler = async (event, context) => {
  const { imdbID } = event.queryStringParameters;

  const { data, errors } = await getShow(imdbID);

  if (errors) {
    console.error(errors);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Something unexpected happened.",
      }),
    };
  }

  if (!data.shows_by_pk) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: `Could not find show with IMDb ID ${imdbID}.`,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data.shows_by_pk),
  };
};

function getShow(imdbID: string) {
  return execute({
    query: `
      query GetShow($imdbID: String!) {
        shows_by_pk(imdbID: $imdbID) {
          imdbID
          title
          poster
          year
          episodes(order_by: {episode: asc, season: asc}) {
            imdbID
            title
            season
            episode
            imdbRating
          }
          totalSeasons
        }
      }    
    `,
    variables: { imdbID },
  });
}
