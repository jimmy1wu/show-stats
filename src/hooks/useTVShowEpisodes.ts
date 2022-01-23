import { useState } from "react";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../lib/constants";
import { getTVShowEpisodes } from "../lib/netlifyFunctionsApi";
import { Show } from "../models";

const useTVShowEpisodes = (imdbID: string) => {
  const [season, setSeason] = useState(0);

  const fallback: Required<Show> = {
    imdbID: "",
    title: "",
    year: "",
    poster: "",
    episodes: [],
    totalSeasons: 0,
  };
  const {
    data = fallback,
    isSuccess,
    isLoading,
    error,
    isError,
  } = useQuery([QUERY_KEYS.TV_SHOW_EPISODES, imdbID], () =>
    getTVShowEpisodes(imdbID)
  );

  const episodes = data.episodes.filter(
    (episode) => season === 0 || episode.season === season
  );

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
    ...data,
    season,
    setSeason,
    episodes,
    sortedEpisodes,
    averageRating,
    highestRatedEpisodes,
    lowestRatedEpisodes,
    isEpisodesSuccess: isSuccess,
    isEpisodesLoading: isLoading,
    episodesError: error,
    isEpisodesError: isError,
  };
};

export default useTVShowEpisodes;
