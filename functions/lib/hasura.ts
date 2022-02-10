import axios from "axios";

const hasura = axios.create({
  baseURL: process.env.HASURA_API_URL,
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
  },
});

type Response = {
  data: any;
  errors: any;
};

export const execute = async ({
  query,
  variables = {},
}: {
  query: string;
  variables?: object;
}) => {
  const { data } = await hasura.post<Response>("/", {
    query,
    variables,
  });
  return data;
};
