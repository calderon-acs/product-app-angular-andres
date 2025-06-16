import { LoadingService } from './../../../../services/loading.service';
import { CurrencyPipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../models/product.model';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialog } from '../product-dialog/product-dialog';
import { ConfirmDialog } from '../../../../componets/confirm-dialog/confirm-dialog';
import { SuccessDialog } from '../../../../componets/success-dialog/success-dialog';
import { ErrorDialog } from '../../../../componets/error-dialog/error-dialog';
import { finalize } from 'rxjs';

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
    private productService: ProductService,
    private cdRef: ChangeDetectorRef,
    private LoadingService: LoadingService
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
        this.LoadingService.show();
        this.productService
          .delete(product.id)
          .pipe(
            finalize(() => {
              this.LoadingService.hide();
            })
          )
          .subscribe({
            next: (data) => {
              this.dialog.open(SuccessDialog, { data: 'Se elimino con exito' });
              this.getAllProducts();
            },
            error: (error) => {
              this.dialog.open(ErrorDialog, { data: 'Ocurrio un error' });
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
