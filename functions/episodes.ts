import { Handler } from "@netlify/functions";
import redis from "./lib/redis";
import { getSeasonEpisodes, getShowById } from "./lib/omdb";
import { Episode } from "../src/models";

export const handler: Handler = async (event, context) => {
  const { imdbID } = event.queryStringParameters;

  const ratings = JSON.parse(await redis.get(imdbID));

  const { title, totalSeasons } = await getShowById(imdbID);

  const episodes: Episode[] = [];
  for (let season = 1; season <= totalSeasons; season++) {
    const seasonEpisodes = await getSeasonEpisodes(imdbID, season);
    episodes.push(...seasonEpisodes);
  }

  episodes.forEach((episode) => {
    episode.imdbRating = ratings[episode.imdbID];
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      title,
      episodes,
      totalSeasons,
    }),
  };
};
