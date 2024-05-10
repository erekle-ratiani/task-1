import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesViewComponent } from './movies/movies-view/movies-view.component';
import { MovieFormComponent } from './core/movies/edit-movie/movie-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', component: MoviesViewComponent },
  { path: 'form', component: MovieFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
