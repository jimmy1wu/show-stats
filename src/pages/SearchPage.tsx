import React, { useEffect, useState } from "react";
import {
  Container,
  SearchForm,
  SearchResults,
  Loading,
  ErrorMessage,
} from "../components";
import usePrefetchShow from "../hooks/usePrefetchShow";
import useSearch from "../hooks/useSearch";
import usePrefetchSearch from "../hooks/usePrefetchSearch";
import { DEFAULT_SHOW } from "../lib/constants";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const prefetchSearch = usePrefetchSearch();
  const prefetchShow = usePrefetchShow();

  const {
    search,
    searchResults,
    isSearchLoading,
    isSearchSuccess,
    searchError,
    isSearchError,
  } = useSearch(searchTerm);

  useEffect(() => {
    prefetchSearch(DEFAULT_SHOW);
  }, [prefetchSearch]);

  useEffect(() => {
    if (searchTerm !== "") {
      search();
    }
  }, [searchTerm, search]);

  useEffect(() => {
    if (isSearchSuccess && searchResults.length > 0) {
      const imdbID = searchResults[0].imdbID;
      prefetchShow(imdbID);
    }
  }, [isSearchSuccess, searchResults, prefetchShow]);

  return (
    <>
      <section className="bg-blue-700 pt-16 pb-12">
        <Container>
          <SearchForm
            placeholder={`e.g., ${DEFAULT_SHOW}`}
            onSubmit={(query: string) => {
              setSearchTerm(query);
            }}
          />
        </Container>
      </section>
      <section className="pt-10 pb-20">
        <Container>
          {isSearchLoading && (
            <Loading />
          )}
          {isSearchError && (
            <ErrorMessage error={searchError} />
          )}
          {isSearchSuccess && (
            <SearchResults
              searchTerm={searchTerm}
              searchResults={searchResults}
            />
          )}
        </Container>
      </section>
    </>
  );
};

export default SearchPage;
