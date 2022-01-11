import React, { useEffect, useState } from "react";
import { Container, SearchForm, SearchResults, Loading } from "../components";
import useSearchTVShow from "../hooks/useSearchTVShow";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    fetchSearchResults,
    searchResults,
    isLoadingSearchResults,
    searchResultsError,
    isSearchResultsError,
  } = useSearchTVShow(searchTerm);

  useEffect(() => {
    if (searchTerm !== "") {
      fetchSearchResults();
    }
  }, [searchTerm, fetchSearchResults]);

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
          {isLoadingSearchResults ? (
            <Loading />
          ) : (
            searchResults && (
              <SearchResults
                searchTerm={searchTerm}
                searchResults={searchResults.results}
              />
            )
          )}
        </Container>
      </div>
    </div>
  );
};

export default SearchPage;
