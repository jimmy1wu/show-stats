import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="mx-8 md:mx-24 lg:mx-36 xl:mx-48 2xl:mx-64">{children}</div>
  );
};

export default Container;
