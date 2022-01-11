import { useQuery } from "react-query";
import { QUERY_KEYS } from "../lib/constants";
import { getTVShowEpisodes } from "../lib/netlifyFunctionsApi";

const useTVShowEpisodes = (imdbID: string) => {
  const { data, isLoading, error, isError } = useQuery(
    [QUERY_KEYS.TV_SHOW_EPISODES, imdbID],
    () => getTVShowEpisodes(imdbID)
  );

  const episodes = data?.episodes ?? [];

  const sortedEpisodes = episodes
    .slice()
    .sort((a, b) => b.imdbRating - a.imdbRating)
    .filter((episode) => episode.imdbRating !== 0);

  const averageRating = parseFloat(
    (
      sortedEpisodes.reduce((a, b) => a + b.imdbRating, 0) /
      sortedEpisodes.length
    ).toFixed(1)
  );
  const highestRatedEpisodes = sortedEpisodes.slice(0, 5);
  const lowestRatedEpisodes = sortedEpisodes.slice(-5).reverse();

  return {
    seriesName: data?.title ?? "",
    totalSeasons: data?.totalSeasons ?? 0,
    episodes,
    sortedEpisodes,
    averageRating,
    highestRatedEpisodes,
    lowestRatedEpisodes,
    isEpisodesLoading: isLoading,
    episodesError: error,
    isEpisodesError: isError,
  };
};

export default useTVShowEpisodes;
