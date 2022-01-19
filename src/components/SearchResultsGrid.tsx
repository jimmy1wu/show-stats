import React from "react";
import { TVShowCard } from ".";
import { Show } from "../models";

type SearchResultsGridProps = {
  searchResults: Show[];
};

const SearchResultsGrid = ({ searchResults }: SearchResultsGridProps) => {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4">
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
