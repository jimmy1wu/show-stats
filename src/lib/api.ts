import axios from "axios";
import { Show } from "./types";

const API_BASE_URL = "/api";

const api = axios.create({ baseURL: API_BASE_URL });

export const search = async (query: string) => {
  const url = "/search";
  const { data } = await api.get<Show[]>(url, {
    params: { query },
  });
  return data;
};

export const getShow = async (imdbID: string) => {
  const url = "/get-show";
  const { data } = await api.get<Required<Show>>(url, {
    params: { imdbID },
  });
  return data;
};
