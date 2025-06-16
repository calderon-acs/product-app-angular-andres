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

  /**
   * Abre el modal para actualizar
   *
   * @param {Product} product - El producto que se desea actualizar.
   * @returns {void}
   */
  updateProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductDialog, {
      data: product,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllProducts();
    });
  }

  /**
   * Confirma la eliminacion de un producto e invoca al servicio para eliminar
   *
   * @param {Product} product - El producto que se desea eliminar.
   * @returns {void}
   */
  deleteProduct(product: Product) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: { msg: '¿Desea eliminar el producto?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.delete(product).subscribe({
          next: () => {
            this.getAllProducts();
          },
        });
      }
    });
  }

  /**
   * Obtiene todos los productos y los asigna a la data de la tabla
   *
   * @returns {void}
   */
  getAllProducts() {
    this.productService.getAll().subscribe((data) => {
      this.listProducts = data;
      this.cdRef.detectChanges(); // se agrea para evitar el error: ExpressionChangedAfterItHasBeenCheckedError
    });
  }
}
