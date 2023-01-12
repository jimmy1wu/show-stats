import { useQueryClient } from "react-query";
import { QUERY_KEYS } from "../lib/react-query";
import { search } from "../lib/api";

const usePrefetchSearch = () => {
  const queryClient = useQueryClient();

  const prefetchShow = (query: string) => {
    queryClient.prefetchQuery([QUERY_KEYS.SEARCH, query], () => 
      search(query)
    );
  };

  return prefetchShow;
};

export default usePrefetchSearch;
