import React from "react";
import { useParams } from "react-router";
import {
  Container,
  Loading,
  RatingsChart,
  EpisodeList,
  RatingDisplay,
} from "../components";
import useShow from "../hooks/useShow";

const ShowPage = () => {
  const { imdbID } = useParams<{ imdbID: string }>();

  const {
    title,
    season,
    setSeason,
    totalSeasons,
    averageRating,
    episodes,
    highestRatedEpisodes,
    lowestRatedEpisodes,
    isShowLoading,
    showError,
    isShowError,
  } = useShow(imdbID);

  if (isShowLoading) {
    return <Loading />;
  }

  return (
    <Container className="pt-10 pb-20">
      <section className="mb-6">
        <RatingsChart
          imdbID={imdbID}
          title={title}
          episodes={episodes}
          totalSeasons={totalSeasons}
          currentSeason={season}
          setCurrentSeason={setSeason}
        />
      </section>
      <section className="flex flex-col lg:flex-row gap-5 text-center">
        <RatingDisplay
          title="Average rating ⭐" 
          rating={averageRating}
        />
        <EpisodeList
          title="Highest rated 👍"
          episodes={highestRatedEpisodes}
        />
        <EpisodeList
          title="Lowest rated 👎"
          episodes={lowestRatedEpisodes}
        />
      </section>
    </Container>
  );
};

export default ShowPage;
