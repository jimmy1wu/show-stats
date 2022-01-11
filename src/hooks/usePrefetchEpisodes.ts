import { useQueryClient } from "react-query";
import { QUERY_KEYS } from "../lib/constants";
import { getTVShowEpisodes } from "../lib/netlifyFunctionsApi";

const usePrefetchEpisodes = () => {
  const queryClient = useQueryClient();

  const prefetchEpisodes = (imdbID: string) => {
    queryClient.prefetchQuery([QUERY_KEYS.TV_SHOW_EPISODES, imdbID], () =>
      getTVShowEpisodes(imdbID)
    );
  };

  return prefetchEpisodes;
};

export default usePrefetchEpisodes;
