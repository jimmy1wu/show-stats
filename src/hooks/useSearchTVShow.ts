import { useQuery } from "react-query";
import { QUERY_KEYS } from "../lib/constants";
import { searchTVShow } from "../lib/netlifyFunctionsApi";

const useSearchTVShow = (query: string) => {
  const { refetch, data, isLoading, error, isError } = useQuery(
    [QUERY_KEYS.TV_SHOWS, query],
    () => searchTVShow(query),
    {
      enabled: false,
    }
  );

  return {
    fetchSearchResults: refetch,
    searchResults: data,
    isLoadingSearchResults: isLoading,
    searchResultsError: error,
    isSearchResultsError: isError,
  };
};

export default useSearchTVShow;
