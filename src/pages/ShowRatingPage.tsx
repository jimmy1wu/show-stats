import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router";
import { getTVShowEpisodes } from "../api";
import { TVShowEpisodes } from "../models";
import { getColorFromRating } from "../utils";
import { Container, Loading, RatingsChart, EpisodeList } from "../components";

type MatchParams = {
  id: string;
};

const ShowRatingPage = () => {
  const [showData, setShowData] = useState<TVShowEpisodes | null>(null);
  const match = useRouteMatch<MatchParams>();
  const imdbID = match.params.id;

  useEffect(() => {
    (async () => {
      const tvShowEpisodes = await getTVShowEpisodes(imdbID);
      setShowData(tvShowEpisodes);
    })();
  }, [imdbID]);

  if (!showData) {
    return (
      <Container>
        <div className="pt-10 pb-20">
          <Loading />
        </div>
      </Container>
    );
  }

  const sortedEpisodes = showData.episodes
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

  return (
    <Container>
      <div className="pt-10 pb-20">
        <div className="mb-6">
          <RatingsChart
            imdbID={imdbID}
            title={showData.title}
            episodes={showData.episodes}
            totalSeasons={showData.totalSeasons}
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
