import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMovie } from 'src/app/movies/shared/interface/movie.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  getMovies(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${this.apiUrl}/movies`);
  }
  getMovie(id: number): Observable<IMovie> {
    return this.http.get<IMovie>(`${this.apiUrl}/movies/${id}`);
  }
  addMovie(newMovie: IMovie): Observable<IMovie> {
    return this.http.post<IMovie>(`${this.apiUrl}/movies`, { ...newMovie });
  }
  updateMovie(updatedMovie: Partial<IMovie>, id: number): Observable<IMovie> {
    return this.http.patch<IMovie>(`${this.apiUrl}/movies/${id}`, updatedMovie);
  }
}
