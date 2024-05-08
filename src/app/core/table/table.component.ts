import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IMovie } from 'src/app/movies/shared/interface/movie.interface';
@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    BrowserModule,
  ],
})
export class TableComponent implements OnChanges {
  displayedColumns: string[] = [];
  @Input() ELEMENT_DATA: IMovie[] | null = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<IMovie>;

  ngOnChanges(): void {
    if (!this.ELEMENT_DATA) return;
    Object.keys(this.ELEMENT_DATA[0]).forEach((key) => {
      this.displayedColumns.push(key);
    });
    this.dataSource = new MatTableDataSource<IMovie>(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    console.log(this.paginator);
  }
}
