import { useQuery } from "react-query";
import { QUERY_KEYS } from "../lib/react-query";
import { search } from "../lib/api";

const useSearch = (query: string) => {
  const { refetch, data, isLoading, isSuccess, error, isError } = useQuery(
    [QUERY_KEYS.SEARCH, query],
    () => search(query),
    {
      enabled: false,
    }
  );

  return {
    search: refetch,
    searchResults: data?.results ?? [],
    isSearchLoading: isLoading,
    isSearchSuccess: isSuccess,
    searchError: error,
    isSearchError: isError,
  };
};

export default useSearch;
