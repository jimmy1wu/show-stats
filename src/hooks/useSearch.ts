import { useQuery } from "react-query";
import { QUERY_KEYS } from "../lib/react-query";
import { search } from "../lib/api";
import { Show } from "../lib/types";

const useSearch = (query: string) => {
  const fallback: Show[] = [];
  const {
    refetch,
    data = fallback,
    isLoading,
    isSuccess,
    error,
    isError,
  } = useQuery(
    [QUERY_KEYS.SEARCH, query], 
    () => search(query), 
    { enabled: false }
  );

  return {
    search: refetch,
    searchResults: data,
    isSearchLoading: isLoading,
    isSearchSuccess: isSuccess,
    searchError: error,
    isSearchError: isError,
  };
};

export default useSearch;
