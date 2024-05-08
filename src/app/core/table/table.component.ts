import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IMovie } from 'src/app/movies/shared/interface/movie.interface';
@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [MatTableModule, MatPaginatorModule, BrowserAnimationsModule],
})
export class TableComponent implements AfterViewInit, OnInit, OnChanges {
  displayedColumns: string[] = [];
  @Input() ELEMENT_DATA!: IMovie[];
  dataSource = new MatTableDataSource<IMovie>([
    {
      id: 1,
      title: 'Laughter in the Shadows',
      rating: 5,
      genre: ['comedy', 'horror', 'mystery'],
    },
  ]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    console.log(this.ELEMENT_DATA);
  }
  ngOnChanges(): void {
    if (!this.ELEMENT_DATA) return;
    console.log(this.displayedColumns, this.ELEMENT_DATA);
    this.displayedColumns = ['id', 'title', 'rating', 'genre'];
    this.dataSource = new MatTableDataSource<IMovie>(this.ELEMENT_DATA);
  }
  ngAfterViewInit() {
    console.log(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  }
  ngAfterContentInit() {
    console.log(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  }
}
