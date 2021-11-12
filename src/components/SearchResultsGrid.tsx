import React from "react";
import { TVShowCard } from ".";
import { Show } from "../models";

type SearchResultsGridProps = {
  searchResults: Show[];
};

const SearchResultsGrid = ({ searchResults }: SearchResultsGridProps) => {
  return (
    <div className="col-count-1 md:col-count-2 lg:col-count-3 xl:col-count-4">
      {searchResults.map((searchResult) => (
        <TVShowCard
          key={searchResult.imdbID}
          title={searchResult.Title}
          year={searchResult.Year}
          imdbID={searchResult.imdbID}
          posterURL={searchResult.Poster}
        />
      ))}
    </div>
  );
};

export default SearchResultsGrid;
