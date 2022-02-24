import React from "react";
import axios from "axios";

type ErrorMessageProps = {
  error: unknown;
};

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  let title = "Oh no!";
  let message = "Something went wrong.";

  if (axios.isAxiosError(error)) {
    title = error.response!.data.title;
    message = error.response!.data.message;
  }

  return (
    <div className="px-10 text-center">
      <h3 className="text-4xl">{title}</h3>
      <p className="text-xl">{message}</p>
    </div>
  );
};

export default ErrorMessage;
