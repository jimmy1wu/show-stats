import React from "react";
import { useHistory } from "react-router";
import { Container } from ".";
import { ReactComponent as Logo } from "../assets/logo.svg";

const Header = () => {
  const history = useHistory();

  return (
    <header className="bg-blue-700 py-2.5">
      <Container>
        <button
          className="cursor-pointer text-2xl text-gray-50"
          onClick={() => history.push("/")}
        >
          <Logo />
        </button>
      </Container>
    </header>
  );
};

export default Header;
