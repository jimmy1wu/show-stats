import React, { useState, useEffect } from "react";

const Loading = () => {
  const [angle, setAngle] = useState(6);

  useEffect(() => {
    setTimeout(() => {
      setAngle(-1 * angle);
    }, 500);
  }, [angle]);

  let rotateTransform = `rotate-${Math.abs(angle)}`;
  if (angle < 0) {
    rotateTransform = `-${rotateTransform}`;
  }

  return (
    <div className={`text-center text-2xl transform ${rotateTransform}`}>
      ⌛ Loading...
    </div>
  );
};

export default Loading;
