import { Handler } from "@netlify/functions";

export const withErrorHandler =
  (baseHandler: Handler): Handler =>
  async (event, context) => {
    try {
      const result = await baseHandler(event, context, null);
      if (result) {
        return result;
      }
    } catch (err) {
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify({
          title: "Server error!",
          message: "Something unexpected happened.",
        }),
      };
    }
  };
