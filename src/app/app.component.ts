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
  ngOnInit() {}
}
