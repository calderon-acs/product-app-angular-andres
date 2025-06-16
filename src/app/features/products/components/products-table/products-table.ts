import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-products-table',
  imports: [MatTableModule, CurrencyPipe],
  templateUrl: './products-table.html',
  styleUrl: './products-table.scss'
})
export class ProductsTable {

  listProducts: any[] = [{id:1, title:"short negro", price: 100, category: "short",image:"https://m.media-amazon.com/images/I/51tMKTrGD4L._AC_SX679_.jpg"}];
  displayedColumns: string[] = [
    'image',
    'title',
    'price',
    'category'
  ];
}
