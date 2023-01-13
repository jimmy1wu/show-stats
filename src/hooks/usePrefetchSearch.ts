import { useQueryClient } from "react-query";
import { QUERY_KEYS } from "../lib/react-query";
import { search } from "../lib/api";

const usePrefetchSearch = () => {
  const queryClient = useQueryClient();

  const prefetchShow = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    queryClient.prefetchQuery([QUERY_KEYS.SEARCH, lowercaseQuery], () => 
      search(lowercaseQuery)
    );
  };

  return prefetchShow;
};

export default usePrefetchSearch;
