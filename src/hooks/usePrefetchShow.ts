import { useQueryClient } from "react-query";
import { QUERY_KEYS } from "../lib/react-query";
import { getShow } from "../lib/api";

const usePrefetchShow = () => {
  const queryClient = useQueryClient();

  const pretfetchShow = (imdbID: string) => {
    queryClient.prefetchQuery([QUERY_KEYS.GET_SHOW, imdbID], () =>
      getShow(imdbID)
    );
  };

  return pretfetchShow;
};

export default usePrefetchShow;
