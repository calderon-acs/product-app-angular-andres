import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ProductsTable } from '../../components/products-table/products-table';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialog } from '../../components/product-dialog/product-dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-products-card',
  imports: [MatCardModule, ProductsTable, ProductsTable, MatButton],
  templateUrl: './products-card.html',
  styleUrl: './products-card.scss',
})
export class ProductsCard {
  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(ProductDialog);
  }
}
