import React, { useState } from "react";

type SearchFormProps = {
  onSubmit: (q: string) => void;
};

const SearchForm = ({ onSubmit }: SearchFormProps) => {
  const [query, setQuery] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(query);
      }}
    >
      <label
        className="block text-2xl md:text-4xl font-bold text-yellow-300"
        htmlFor="query"
      >
        Search for a TV show
      </label>
      <input
        className="rounded-l-md bg-white w-9/12 md:w-10/12 lg:w-11/12 py-4 px-4 focus:outline-none"
        autoFocus
        type="text"
        name="query"
        autoComplete="off"
        spellCheck="false"
        placeholder="e.g., Dexter"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <input
        className="rounded-r-md w-3/12 md:w-2/12 lg:w-1/12 py-4 text-white bg-gradient-to-br from-yellow-300 to-pink-700"
        type="submit"
        value="Search"
      />
    </form>
  );
};

export default SearchForm;
