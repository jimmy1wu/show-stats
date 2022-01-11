import React from "react";
import { useRouteMatch } from "react-router";
import { getColorFromRating } from "../utils";
import { Container, Loading, RatingsChart, EpisodeList } from "../components";
import useTVShowEpisodes from "../hooks/useTVShowEpisodes";

type MatchParams = {
  id: string;
};

const ShowRatingPage = () => {
  const match = useRouteMatch<MatchParams>();
  const imdbID = match.params.id;

  const {
    seriesName,
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
            totalSeasons={totalSeasons}
          />
        </div>
        <div className="lg:flex text-center">
          <div className="lg:flex-1 lg:mx-2 mb-10">
            <div className="px-8 pt-5 pb-10 ">
              <h2 className="text-2xl md:text-3xl">Average rating ⭐</h2>
              <div className="mt-2.5">
                <span
                  className={`text-9xl ${getColorFromRating(averageRating)}`}
                >
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-2xl text-gray-500">/10</span>
              </div>
            </div>
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
