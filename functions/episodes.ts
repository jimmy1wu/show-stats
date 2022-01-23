import { Handler } from "@netlify/functions";
import redis from "./lib/redis";
import { getSeasonEpisodes, getShowById } from "./lib/omdb";
import { Episode } from "../src/models";

export const handler: Handler = async (event, context) => {
  const { imdbID } = event.queryStringParameters;

  const { title, totalSeasons } = await getShowById(imdbID);

  const promises: Promise<Episode[]>[] = [];
  for (let season = 1; season <= totalSeasons; season++) {
    promises.push(getSeasonEpisodes(imdbID, season));
  }
  const data = await Promise.all(promises);

  const episodes: Episode[] = [];
  data.forEach((seasonEpisodes) => {
    episodes.push(...seasonEpisodes);
  });

  const ratings = JSON.parse(await redis.get(imdbID));
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
