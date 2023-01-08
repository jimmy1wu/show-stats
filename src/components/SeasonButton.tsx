import React from "react";

type SeasonButtonProps = {
  season: number;
  active: boolean;
  onClick: () => void;
};

const SeasonButton = ({ season, active, onClick }: SeasonButtonProps) => {
  return (
    <button
      data-test-id="show-season-button"
      className={`text-white ${
        active ? "bg-gradient-to-br from-yellow-300 to-pink-600" : "bg-blue-500"
      } text-white m-0.5 py-2 px-4 rounded`}
      onClick={onClick}
    >
      {season === 0 ? "All" : season}
    </button>
  );
};

export default SeasonButton;
