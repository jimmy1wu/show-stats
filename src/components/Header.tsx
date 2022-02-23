import React from "react";
import { Link } from "react-router-dom";
import { Container } from ".";
import { ReactComponent as Logo } from "../assets/logo.svg";

const Header = () => {
  return (
    <header className="bg-blue-700 py-2.5">
      <Container>
        <Link to="/">
          <Logo />
        </Link>
      </Container>
    </header>
  );
};

export default Header;
