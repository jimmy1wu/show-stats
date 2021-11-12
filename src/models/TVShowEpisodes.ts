import { Episode } from ".";

export interface TVShowEpisodes {
  title: string;
  episodes: Episode[];
  totalSeasons: number;
}
