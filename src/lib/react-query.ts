import { QueryClient } from "react-query";

export const QUERY_KEYS = {
  SEARCH: "search",
  GET_SHOW: "get-show",
};

const queryClient = new QueryClient();

export default queryClient;
