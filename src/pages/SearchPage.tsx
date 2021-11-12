import React, { useState } from "react";
import { Container, SearchForm, SearchResults, Loading } from "../components";
import { searchTVShow } from "../api";
import { Show } from "../models";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Show[] | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (query: string) => {
    setLoading(true);
    setSearchTerm(query);
    const { results } = await searchTVShow(query);
    setSearchResults(results);
    setLoading(false);
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
          {loading ? (
            <Loading />
          ) : (
            searchResults && (
              <SearchResults
                searchTerm={searchTerm}
                searchResults={searchResults}
              />
            )
          )}
        </Container>
      </div>
    </div>
  );
};

export default SearchPage;
