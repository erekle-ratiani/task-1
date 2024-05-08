import { Component, OnInit } from '@angular/core';
import { MoviesService } from './shared/service/movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'task-1';
  constructor(private movieService: MoviesService) {}
  ngOnInit() {
    this.movieService.getMovies().subscribe({
      next: (value: any) => {
        console.log(value);
        this.title = value[0].title;
        console.log(this.title);
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
