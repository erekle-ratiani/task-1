import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMovies } from 'src/app/movies/shared/interface/movie.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  getMovies(): Observable<IMovies> {
    return this.http.get<IMovies>(`${this.apiUrl}/movies`);
  }
}
