import { Handler } from "@netlify/functions";
import { execute } from "./lib/hasura";
import { withErrorHandler } from "./lib/middleware";

const baseHandler: Handler = async (event, context) => {
  const { imdbID } = event.queryStringParameters;

  const { show } = await getShow(imdbID);

  if (!show) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        title: "Not found!",
        message: `Could not find show with IMDb ID ${imdbID}.`,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(show),
  };
};

export const handler = withErrorHandler(baseHandler);

function getShow(imdbID: string) {
  return execute({
    query: `
      query GetShow($imdbID: String!) {
        show: shows_by_pk(imdbID: $imdbID) {
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
