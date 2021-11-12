import React from "react";
import { TooltipProps } from "recharts";
import { getColorFromRating } from "../utils";

const RatingTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload || !payload[0]) {
    return null;
  }

  const { title, season, episode, imdbRating } = payload[0].payload;

  return (
    <div className="bg-white px-4 py-2">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-base italic text-gray-500 mb-2">{`S${season}E${episode}`}</p>
      <hr />
      <p
        className={`text-lg font-extrabold ${getColorFromRating(
          imdbRating
        )} mt-2`}
      >
        {imdbRating === 0 ? "N/A" : `${imdbRating.toFixed(1)}/10`}
      </p>
    </div>
  );
};

export default RatingTooltip;
