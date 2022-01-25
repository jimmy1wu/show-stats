import React, { PropsWithChildren } from "react";

type ContainerProps = {
  className?: string;
};

const Container = ({
  className,
  children,
}: PropsWithChildren<ContainerProps>) => {
  return (
    <div className="container mx-auto px-4">
      <div className={className}>{children}</div>
    </div>
  );
};

export default Container;
