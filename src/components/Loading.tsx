import React from "react";
import { ReactComponent as ColourBarsTv } from "../assets/tv-colour-bars.svg";

const Loading = () => {
  return (
    <div className="pt-10 text-center text-2xl">
      <ColourBarsTv className="block m-auto h-40 w-40" />
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
