import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IMovie } from 'src/app/movies/shared/interface/movie.interface';
import { Router } from '@angular/router';
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
  constructor(private router: Router) {}
  ngOnChanges(): void {
    if (!this.ELEMENT_DATA) return;

    this.populateTableCollumns(this.ELEMENT_DATA);
    this.dataSource = new MatTableDataSource<IMovie>(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  }
  editElment(id: number) {
    this.router.navigate([`/form/${id}`], {
      queryParams: {
        edit: 'true',
      },
    });
  }
  addMovie() {
    this.router.navigate([`/form/new`], {
      queryParams: {
        create: 'true',
      },
    });
  }
  populateTableCollumns(ELEMENT_DATA: {}[]) {
    Object.keys(ELEMENT_DATA[0]).forEach((key) => {
      this.displayedColumns.push(key);
    });
  }
}
