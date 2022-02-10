export type Episode = {
  imdbID: string;
  title: string;
  season: number;
  episode: number;
  imdbRating: number;
};

export type Show = {
  imdbID: string;
  title: string;
  year: string;
  poster: string;
  episodes?: Episode[];
  totalSeasons?: number;
};
