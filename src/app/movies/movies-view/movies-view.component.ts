import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/shared/service/movies.service';

@Component({
  selector: 'app-movies-view',
  templateUrl: './movies-view.component.html',
  styleUrls: ['./movies-view.component.scss'],
})
export class MoviesViewComponent implements OnInit {
  movieData: any;
  constructor(private moveiService: MoviesService) {}

  ngOnInit(): void {
    this.moveiService.getMovies().subscribe({
      next: (v: any) => (this.movieData = v.movies),
      error: (e) => console.error(e),
    });
  }
}
