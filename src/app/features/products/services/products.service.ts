import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../../../services/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import { SuccessDialog } from '../../../componets/success-dialog/success-dialog';
import { ErrorDialog } from '../../../componets/error-dialog/error-dialog';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private apiService: ApiService,
    private loadingService: LoadingService,
    private dialog: MatDialog
  ) {}

  /**
   * Crea o actualiza un producto
   *
   * @param {Product} product - El producto que se desea guardar.
   * @returns {void}
   */
  save(data: Product): Observable<void> {
    this.loadingService.show();

    const request$ =
      data?.id === 0 ? this.apiService.add(data) : this.apiService.update(data);

    return new Observable<void>((observer) => {
      request$.pipe(finalize(() => this.loadingService.hide())).subscribe({
        next: () => {
          this.dialog.open(SuccessDialog, { data: 'Se creó con éxito' });
          observer.next();
          observer.complete();
        },
        error: () => {
          this.dialog.open(ErrorDialog, { data: 'Ocurrió un error' });
          observer.error(new Error('Error en el envío del producto'));
        },
      });
    });
  }

  /**
   *Elimina un producto
   *
   * @param {Product} product - El producto que se desea eliminar.
   * @returns {void}
   */
  delete(product: Product): Observable<void> {
    this.loadingService.show();

    const requets$ = this.apiService.delete(product.id);

    return new Observable<void>((observer) => {
      requets$
        .pipe(
          finalize(() => {
            this.loadingService.hide();
          })
        )
        .subscribe({
          next: (data) => {
            this.dialog.open(SuccessDialog, { data: 'Se elimino con exito' });
            observer.next();
            observer.complete();
          },
          error: (error) => {
            this.dialog.open(ErrorDialog, { data: 'Ocurrio un error' });
            observer.error(new Error('Error al borrar el producto'));
          },
        });
    });
  }

  /**
   *Obtiene todos los productos
   *
   * @param {Product} product - El producto que se desea eliminar.
   * @returns {void}
   */
  getAll(): Observable<Product[]> {
    this.loadingService.show();

    const request$ = this.apiService.getAll();

    return new Observable<Product[]>((observer) => {
      request$.pipe(finalize(() => this.loadingService.hide())).subscribe({
        next: (response) => {
          observer.next(response);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        },
      });
    });
  }
}
