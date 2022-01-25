import React from "react";
import {
  ResponsiveContainer,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { SeasonButton, RatingTooltip } from ".";
import { Episode } from "../lib/types";
import useAspectRatio from "../hooks/useAspectRatio";

type RatingsChartProps = {
  imdbID: string;
  title: string;
  episodes: Episode[];
  totalSeasons: number;
  currentSeason: number;
  setCurrentSeason: (season: number) => void;
};

const RatingsChart = ({
  imdbID,
  title,
  episodes,
  totalSeasons,
  currentSeason,
  setCurrentSeason,
}: RatingsChartProps) => {
  const aspectRatio = useAspectRatio();

  let xTicks;
  if (currentSeason === 0) {
    xTicks = Array.from({ length: totalSeasons }, (v, k) => k + 1);
  }

  const buttons = [];
  for (let season = 0; season <= totalSeasons; season++) {
    buttons.push(
      <SeasonButton
        key={season}
        season={season}
        active={currentSeason === season}
        onClick={() => setCurrentSeason(season)}
      />
    );
  }

  return (
    <div>
      <div className="lg:flex lg:flex-wrap items-end mb-2">
        <div className="lg:flex-1">
          <a
            className="text-4xl lg:text-5xl font-semibold hover:underline"
            href={`https://www.imdb.com/title/${imdbID}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </a>
        </div>
        <div className="lg:flex-1 lg:text-right">
          <h2 className="text-2xl">Season</h2>
          {buttons}
        </div>
      </div>
      <ResponsiveContainer width="100%" aspect={2 * aspectRatio}>
        <AreaChart data={episodes}>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={1} />
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <XAxis dataKey={xTicks ? "season" : "episode"} ticks={xTicks} />
          <YAxis domain={[0, 10]} tickCount={10} width={20} />
          <Tooltip content={RatingTooltip} />
          <CartesianGrid />
          <Area
            type="linear"
            dataKey="imdbRating"
            stroke="#DB2777"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#gradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingsChart;
