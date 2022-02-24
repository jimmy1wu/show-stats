import { QueryClient } from "react-query";

export const QUERY_KEYS = {
  SEARCH: "search",
  GET_SHOW: "get-show",
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

export default queryClient;
