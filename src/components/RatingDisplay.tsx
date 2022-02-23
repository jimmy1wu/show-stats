import React from "react";
import { getColorFromRating } from "../lib/utils";

type RatingDisplayProps = {
  title: string;
  rating: number;
  scale?: number;
};

const RatingDisplay = ({
  title,
  rating,
  scale = 10,
}: RatingDisplayProps) => {
  return (
    <div className="w-full px-8 pt-5 pb-10">
      <h2 className="text-2xl md:text-3xl">{title}</h2>
      <div className="mt-2.5">
        <span className={`text-9xl ${getColorFromRating(rating)}`}>
          {rating.toFixed(1)}
        </span>
        <span className="text-2xl text-gray-500">/{scale}</span>
      </div>
    </div>
  );
};

export default RatingDisplay;
