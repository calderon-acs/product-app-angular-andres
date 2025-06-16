import { CurrencyPipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Product } from '../../models/product.model';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialog } from '../product-dialog/product-dialog';
import { ConfirmDialog } from '../../../../componets/confirm-dialog/confirm-dialog';
import { ProductService } from '../../services/products.service';

@Component({
  selector: 'app-products-table',
  imports: [MatTableModule, CurrencyPipe, MatIcon],
  templateUrl: './products-table.html',
  styleUrl: './products-table.scss',
})
export class ProductsTable implements OnInit {
  listProducts: Product[] = [];
  displayedColumns: string[] = [
    'image',
    'title',
    'price',
    'category',
    'actions',
  ];
  readonly dialog = inject(MatDialog);

  constructor(
    private cdRef: ChangeDetectorRef,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  updateProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductDialog, {
      data: product,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllProducts();
    });
  }

  deleteProduct(product: Product) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: { msg: '¿Desea eliminar el producto?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.save(product).subscribe({
          next: () => {
            this.getAllProducts();
          },
        });
      }
    });
  }

  getAllProducts() {
    this.productService.getAll().subscribe((data) => {
      this.listProducts = data;
      this.cdRef.detectChanges();
    });
  }
}
