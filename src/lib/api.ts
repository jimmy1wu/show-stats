import axios from "axios";
import { SearchResults, Show } from "./types";

const NETLIFY_FUNCTIONS_URL = "/.netlify/functions";

const netlify = axios.create({ baseURL: NETLIFY_FUNCTIONS_URL });

export const search = async (query: string) => {
  const url = "/search";
  const { data } = await netlify.get<SearchResults>(url, {
    params: { query },
  });
  return data;
};

export const getShow = async (imdbID: string) => {
  const url = "/get-show";
  const { data } = await netlify.get<Required<Show>>(url, {
    params: { imdbID },
  });
  return data;
};
