import React from "react";
import { Episode } from "../models";
import { getColorFromRating } from "../utils";

type EpisodeListProps = {
  title: string;
  episodes: Episode[];
};

const EpisodeList = ({ title, episodes }: EpisodeListProps) => {
  return (
    <div className="rounded-xl bg-white w-full px-8 pt-5 pb-8 shadow-md">
      <h2 className="text-2xl md:text-3xl text-center">{title}</h2>
      <ol className="mt-5 text-left">
        {episodes.map((ep) => {
          const { season, episode, title, imdbRating, imdbID } = ep;
          return (
            <li className="mb-3" key={imdbID}>
              <a
                className="hover:underline"
                href={`https://www.imdb.com/title/${imdbID}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {title}
              </a>
              <p className="text-sm text-gray-500">
                {`S${season}E${episode} • `}
                <span className={`${getColorFromRating(imdbRating)}`}>
                  {imdbRating.toFixed(1)}
                </span>
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default EpisodeList;
