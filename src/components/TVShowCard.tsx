import React from "react";
import { useHistory } from "react-router-dom";
import { DEFAULT_POSTER_URL } from "../lib/constants";

type TVShowCardProps = {
  title: string;
  year: string;
  imdbID: string;
  posterURL: string;
};

const TVShowCard = ({ title, year, imdbID, posterURL }: TVShowCardProps) => {
  const history = useHistory();

  const onClick = () => {
    history.push(`/${imdbID}`);
  };

  return (
    <div
      className="break-inside-avoid w-full first:mt-0 mt-5 shadow-sm hover:shadow-lg"
      onClick={onClick}
    >
      <img
        className="w-full bg-gray-200"
        src={posterURL || DEFAULT_POSTER_URL}
        alt="tv show poster"
      />
      <div className="bg-white text-center py-4 px-2">
        <p className="font-bold">{title}</p>
        <p className="italic text-gray-500">{year}</p>
      </div>
    </div>
  );
};

export default TVShowCard;
