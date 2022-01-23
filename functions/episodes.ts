import { Handler } from "@netlify/functions";
import redis from "./lib/redis";
import { getAllEpisodes, getShowById } from "./lib/omdb";
import { Show } from "../src/models";

export const handler: Handler = async (event, context) => {
  const { imdbID } = event.queryStringParameters;

  const { totalSeasons, ...rest } = await getShowById(imdbID);
  const episodes = await getAllEpisodes(imdbID, totalSeasons);

  const ratings = JSON.parse(await redis.get(imdbID));
  episodes.forEach((episode) => {
    episode.imdbRating = ratings[episode.imdbID] || 0;
  });

  const data: Required<Show> = {
    ...rest,
    episodes,
    totalSeasons,
  };

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
