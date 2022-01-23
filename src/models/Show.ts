import { Episode } from ".";
export interface Show {
  imdbID: string;
  title: string;
  year: string;
  poster: string;
  episodes?: Episode[];
  totalSeasons?: number;
}
