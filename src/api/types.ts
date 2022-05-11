export interface IGetMoviesTMDBParams {
  with_genres?: string;
  primary_release_year?: number;
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;
  page?: number;
}

export interface IGetMoviesTMDBResponse {
  results: TMDBMovie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface TMDBMovie {
  poster_path?: string | null;
  overview: string;
  release_date?: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  title: string;
  vote_count: number;
  vote_average: number;
}
