import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesViewComponent } from './movies-view/movies-view.component';
import { TableComponent } from '../core/table/table.component';

@NgModule({
  declarations: [MoviesViewComponent],
  imports: [CommonModule, TableComponent],
  exports: [MoviesViewComponent],
})
export class MoviesModule {}
