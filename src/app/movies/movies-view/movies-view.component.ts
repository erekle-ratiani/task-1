import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/shared/service/movies.service';
import { IMovie, IMovies } from '../shared/interface/movie.interface';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  map,
  of,
} from 'rxjs';

@Component({
  selector: 'app-movies-view',
  templateUrl: './movies-view.component.html',
  styleUrls: ['./movies-view.component.scss'],
})
export class MoviesViewComponent implements OnInit {
  movieData!: Observable<IMovie[]>;
  constructor(private moveiService: MoviesService) {}

  ngOnInit(): void {
    this.movieData = this.moveiService.getMovies().pipe(
      map((movies) => {
        return movies.map((movie) => {
          return { ...movie, id: Number(movie.id) }; // Convert the ID to a number
        });
      })
    );
  }
}
