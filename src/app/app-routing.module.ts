import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesViewComponent } from './movies/movies-view/movies-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', component: MoviesViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
