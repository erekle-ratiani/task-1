export interface IMovie {
  id: number;
  title: string;
  rating: number;
  genre: string[];
}
export interface IMovies {
  movies: IMovie[];
}
