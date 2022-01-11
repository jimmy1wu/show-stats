import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return <div className="container mx-auto px-4">{children}</div>;
};

export default Container;
