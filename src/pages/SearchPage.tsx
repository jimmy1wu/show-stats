import React, { useEffect, useState } from "react";
import { Container, SearchForm, SearchResults, Loading } from "../components";
import usePrefetchEpisodes from "../hooks/usePrefetchEpisodes";
import useSearchTVShow from "../hooks/useSearchTVShow";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const prefetchEpisodies = usePrefetchEpisodes();

  const {
    fetchSearchResults,
    searchResults,
    isSearchResultsLoading,
    isSearchResultsSuccess,
    searchResultsError,
    isSearchResultsError,
  } = useSearchTVShow(searchTerm);

  useEffect(() => {
    if (searchTerm !== "") {
      fetchSearchResults();
    }
  }, [searchTerm, fetchSearchResults]);

  useEffect(() => {
    if (isSearchResultsSuccess && searchResults.length > 0) {
      const imdbID = searchResults[0].imdbID;
      prefetchEpisodies(imdbID);
    }
  }, [isSearchResultsSuccess, searchResults, prefetchEpisodies]);

  const onSubmit = (query: string) => {
    if (query !== "") {
      setSearchTerm(query);
    }
  };

  return (
    <div>
      <div className="bg-blue-700 pt-16 md:pt-24 pb-12 md:pb-20">
        <Container>
          <SearchForm onSubmit={onSubmit} />
        </Container>
      </div>
      <div className="pt-10 pb-20">
        <Container>
          {isSearchResultsLoading && <Loading />}
          {isSearchResultsSuccess && (
            <SearchResults
              searchTerm={searchTerm}
              searchResults={searchResults}
            />
          )}
        </Container>
      </div>
    </div>
  );
};

export default SearchPage;
