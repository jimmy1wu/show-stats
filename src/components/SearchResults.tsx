import React from "react";
import { SearchResultsGrid } from ".";
import { Show } from "../lib/types";

type SearchResultsProps = {
  searchTerm: string;
  searchResults: Show[];
};

const SearchResults = ({
  searchTerm,
  searchResults,
}: SearchResultsProps) => {
  return (
    <div>
      <h1 className="text-xl md:text-2xl text-center mb-5">
        Showing results for <span className="italic">{searchTerm}</span>
      </h1>
      {searchResults.length === 0 ? (
        <div className="text-center">No results</div>
      ) : (
        <SearchResultsGrid searchResults={searchResults} />
      )}
    </div>
  );
};

export default SearchResults;
