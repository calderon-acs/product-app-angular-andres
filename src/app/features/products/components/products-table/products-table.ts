import { CurrencyPipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../models/product.model';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialog } from '../product-dialog/product-dialog';
import { ConfirmDialog } from '../../../../componets/confirm-dialog/confirm-dialog';

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
  readonly dialogProduct = inject(MatDialog);
  readonly dialogConfirm = inject(MatDialog);
  
  constructor(
    private productService: ProductService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  updateProduct(product: Product) {
    const dialogRef = this.dialogProduct.open(ProductDialog, {
      data: product,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllProducts();
    });
  }

  deleteProduct(product: Product) {
    const dialogRef = this.dialogConfirm.open(ConfirmDialog, {
      data: { msg: '¿Desea eliminar el producto?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.delete(product.id).subscribe((data) => {
          this.getAllProducts();
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
