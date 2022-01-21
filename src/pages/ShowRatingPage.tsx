import React from "react";
import { useRouteMatch } from "react-router";
import {
  Container,
  Loading,
  RatingsChart,
  EpisodeList,
  RatingDisplay,
} from "../components";
import useTVShowEpisodes from "../hooks/useTVShowEpisodes";

type MatchParams = {
  id: string;
};

const ShowRatingPage = () => {
  const match = useRouteMatch<MatchParams>();
  const imdbID = match.params.id;

  const {
    seriesName,
    season,
    setSeason,
    totalSeasons,
    episodes,
    averageRating,
    highestRatedEpisodes,
    lowestRatedEpisodes,
    isEpisodesLoading,
    episodesError,
    isEpisodesError,
  } = useTVShowEpisodes(imdbID);

  if (isEpisodesLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <div className="pt-10 pb-20">
        <div className="mb-6">
          <RatingsChart
            imdbID={imdbID}
            title={seriesName}
            episodes={episodes}
            currentSeason={season}
            setCurrentSeason={setSeason}
            totalSeasons={totalSeasons}
          />
        </div>
        <div className="lg:flex text-center">
          <div className="lg:flex-1 lg:mx-2 mb-10">
            <RatingDisplay
              title="Average rating ⭐"
              rating={averageRating}
            />
          </div>
          <div className="lg:flex-1 lg:mx-2 mb-10">
            <EpisodeList
              title="Highest rated 👍"
              episodes={highestRatedEpisodes}
            />
          </div>
          <div className="lg:flex-1 lg:mx-2 mb-10">
            <EpisodeList
              title="Lowest rated 👎"
              episodes={lowestRatedEpisodes}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ShowRatingPage;
