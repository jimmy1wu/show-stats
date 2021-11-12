import React from "react";
import { useHistory } from "react-router";

const Header = () => {
  const history = useHistory();

  return (
    <div className="bg-blue-700 text-2xl text-gray-50 px-5 py-2.5">
      <p
        className="cursor-pointer hover:underline"
        onClick={() => history.push("/")}
      >
        📺 📈 Show Stats
      </p>
    </div>
  );
};

export default Header;
