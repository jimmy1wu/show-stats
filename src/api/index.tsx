import axios from "axios";
import { SearchResults, TVShowEpisodes } from "../models";

const NETLIFY_FUNCTIONS = "/.netlify/functions";

const searchTVShow = async (query: string) => {
  const url = `${NETLIFY_FUNCTIONS}/search`;
  const { data } = await axios.get<SearchResults>(url, {
    params: { query },
  });
  return data;
};

const getTVShowEpisodes = async (imdbID: string) => {
  const url = `${NETLIFY_FUNCTIONS}/episodes`;
  const { data } = await axios.get<TVShowEpisodes>(url, {
    params: { imdbID },
  });
  return data;
};

export { searchTVShow, getTVShowEpisodes };
