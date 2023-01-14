import React from "react";
import axios from "axios";

type ErrorMessageProps = {
  error: unknown;
};

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  let title = "Oh no!";
  let message = "Something went wrong.";

  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (data?.title) {
      title = data.title;
    }
    if (data?.message) {
      message = data.message;
    }
  }

  return (
    <div data-test-id="error-message" className="py-10 text-center">
      <h3 className="text-4xl">{title}</h3>
      <p className="text-xl">{message}</p>
    </div>
  );
};

export default ErrorMessage;
