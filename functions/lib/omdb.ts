import axios from "axios";
import { Episode, Show, SearchResults } from "../../src/models";

const OMDB_URL = process.env.OMDB_URL;
const OMDB_API_KEY = process.env.OMDB_API_KEY;

const omdb = axios.create({ baseURL: OMDB_URL });

omdb.interceptors.request.use((config) => {
  config.params = {
    apikey: OMDB_API_KEY,
    ...config.params,
  };
  return config;
});

export const searchByString = async (query: string) => {
  const { data } = await omdb.get<SearchResults>("/", {
    params: { s: query, type: "series" },
    transformResponse: (data) => {
      const resp = JSON.parse(data);
      if (resp.Response === "False") {
        return {
          results: [],
          totalResults: 0,
        };
      }
      const results = resp.Search.map((show) => ({
        title: show.Title,
        year: show.Year,
        imdbID: show.imdbID,
        poster:
          show.Poster !== "N/A"
            ? show.Poster
            : "https://via.placeholder.com/300x400",
      }));
      const res: SearchResults = {
        results,
        totalResults: parseInt(resp.totalResults),
      };
      return res;
    },
  });
  return data;
};

export const getShowById = async (imdbID: string) => {
  const { data } = await omdb.get<Show>("/", {
    params: { i: imdbID, type: "series", plot: "full" },
    transformResponse: (data) => {
      const resp = JSON.parse(data);
      if (resp.Response === "False") {
        throw new Error(resp.Error);
      }
      const res: Show = {
        imdbID: resp.imdbID,
        title: resp.Title,
        year: resp.Year,
        poster:
          resp.Poster !== "N/A"
            ? resp.Poster
            : "https://via.placeholder.com/300x400",
        totalSeasons: parseInt(resp.totalSeasons),
      };
      return res;
    },
  });
  return data;
};

export const getSeasonEpisodes = async (imdbID: string, season: number) => {
  const { data } = await omdb.get<Episode[]>("/", {
    params: { i: imdbID, season, plot: "short" },
    transformResponse: (data) => {
      const resp = JSON.parse(data);
      if (resp.Response === "False") {
        throw new Error(resp.Error);
      }
      const res: Episode[] = resp.Episodes.map((episodeData) => {
        const episode: Episode = {
          imdbID: episodeData.imdbID,
          title: episodeData.Title,
          season,
          episode: parseInt(episodeData.Episode),
          imdbRating: parseFloat(episodeData.imdbRating),
        };
        return episode;
      });
      return res;
    },
  });
  return data;
};

export const getAllEpisodes = async (
  imdbID: string,
  totalSeasons: number
) => {
  const promises: Promise<Episode[]>[] = [];
  for (let season = 1; season <= totalSeasons; season++) {
    promises.push(getSeasonEpisodes(imdbID, season));
  }
  const data = await Promise.all(promises);

  const episodes: Episode[] = [];
  data.forEach((seasonEpisodes) => {
    episodes.push(...seasonEpisodes);
  });
  return episodes;
};
