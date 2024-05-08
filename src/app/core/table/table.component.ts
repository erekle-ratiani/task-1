import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [MatTableModule, MatPaginatorModule, BrowserAnimationsModule],
})
export class TableComponent implements AfterViewInit, OnInit, OnChanges {
  displayedColumns: string[] = [];
  @Input('dataSource') ELEMENT_DATA!: any;
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    console.log(this.ELEMENT_DATA);
  }
  ngOnChanges(): void {
    if (!this.ELEMENT_DATA) return;
    Object.keys(this.ELEMENT_DATA[0]).forEach((key) => {
      this.displayedColumns.push(key);
    });
    console.log(this.displayedColumns, this.ELEMENT_DATA);

    this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
