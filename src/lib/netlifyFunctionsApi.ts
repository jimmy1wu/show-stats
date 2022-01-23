import axios from "axios";
import { NETLIFY_FUNCTIONS } from "./constants";
import { SearchResults, Show } from "../lib/types";

const netlifyFunctionsApi = axios.create({ baseURL: NETLIFY_FUNCTIONS });

export const searchTVShow = async (query: string) => {
  const url = "/search";
  const { data } = await netlifyFunctionsApi.get<SearchResults>(url, {
    params: { query },
  });
  return data;
};

export const getTVShowEpisodes = async (imdbID: string) => {
  const url = "/episodes";
  const { data } = await netlifyFunctionsApi.get<Required<Show>>(url, {
    params: { imdbID },
  });
  return data;
};

export default netlifyFunctionsApi;
