const axios = require("axios").default;

const OMDB_URL = process.env.OMDB_URL;
const OMDB_API_KEY = process.env.OMDB_API_KEY;

exports.handler = async function (event, context) {
  const { imdbID } = event.queryStringParameters;

  const tvShowInfo = await axios.get("/", {
    baseURL: OMDB_URL,
    params: { i: imdbID, plot: "full", apikey: OMDB_API_KEY },
  });

  const episodes = [];
  const totalSeasons = parseInt(tvShowInfo.data.totalSeasons);
  for (let season = 1; season <= totalSeasons; season++) {
    const tvShowSeasonInfo = await axios.get("/", {
      baseURL: OMDB_URL,
      params: { i: imdbID, season, plot: "short", apikey: OMDB_API_KEY },
    });
    const episodesBySeason = tvShowSeasonInfo.data.Episodes.map((episode) => {
      return {
        imdbID: episode.imdbID,
        title: episode.Title,
        season,
        episode: parseInt(episode.Episode),
        imdbRating: parseFloat(episode.imdbRating) || 0,
      };
    });
    episodes.push(...episodesBySeason);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      title: tvShowInfo.data.Title,
      episodes,
      totalSeasons,
    }),
  };
};
