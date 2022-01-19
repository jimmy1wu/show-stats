const axios = require("axios").default;

const OMDB_URL = process.env.OMDB_URL;
const OMDB_API_KEY = process.env.OMDB_API_KEY;

exports.handler = async function (event, context) {
  const { query } = event.queryStringParameters;
  const searchResultsRes = await axios.get("/", {
    baseURL: OMDB_URL,
    params: {
      apikey: OMDB_API_KEY,
      s: query,
      type: "series",
    },
  });

  const { Response, Search } = searchResultsRes.data;

  if (Response === "False") {
    return {
      statusCode: 200,
      body: JSON.stringify({
        results: [],
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      results: Search.map((result) => {
        return {
          ...result,
          Poster:
            result.Poster !== "N/A"
              ? result.Poster
              : "https://via.placeholder.com/300x400",
        };
      }),
    }),
  };
};
