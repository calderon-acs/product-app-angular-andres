import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ProductsTable } from "../../components/products-table/products-table";

@Component({
  selector: 'app-products-card',
  imports: [MatCardModule, ProductsTable, ProductsTable],
  templateUrl: './products-card.html',
  styleUrl: './products-card.scss'
})
export class ProductsCard {

}
