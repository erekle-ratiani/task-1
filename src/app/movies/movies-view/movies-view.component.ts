import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/shared/service/movies.service';
import { IMovie, IMovies } from '../shared/interface/movie.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-movies-view',
  templateUrl: './movies-view.component.html',
  styleUrls: ['./movies-view.component.scss'],
})
export class MoviesViewComponent implements OnInit {
  movieData!: IMovie[];
  constructor(private moveiService: MoviesService) {}

  ngOnInit(): void {
    this.moveiService
      .getMovies()
      .pipe(
        map((movies) => {
          return movies.map((movie) => {
            return { ...movie, id: Number(movie.id) }; // Convert the ID to a number
          });
        })
      )
      .subscribe({
        next: (v: IMovie[]) => {
          console.log(v);

          if (v) {
            this.movieData = v;
          } else {
            console.error(
              'Invalid data format: Movies data is missing or incorrect'
            );
          }
        },
        error: (e) => console.error(e),
      });
  }
}
