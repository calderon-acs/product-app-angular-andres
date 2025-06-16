import { Component, inject, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatError, MatInputModule } from '@angular/material/input';
import { Product } from '../../models/product.model';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../services/product.service';
import { SuccessDialog } from '../../../../componets/success-dialog/success-dialog';
import { ErrorDialog } from '../../../../componets/error-dialog/error-dialog';
import { finalize } from 'rxjs';
import { LoadingService } from '../../../../services/loading.service';

@Component({
  selector: 'app-product-dialog',
  imports: [
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButton,
    MatError,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './product-dialog.html',
  styleUrl: './product-dialog.scss',
})
export class ProductDialog implements OnInit {
  formProduct!: FormGroup;
  product!: Product;
  description: String = 'Crear';
  isSaving: Boolean = false;
  readonly dialog = inject(MatDialog);

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProductDialog>,
    private loadingService: LoadingService,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  ngOnInit(): void {
    this.product = this.data;

    this.description = this.data?.id ? 'Actualizar' : 'Crear';
    this.formProduct = this.fb.group({
      id: [this.product?.id || 0, [Validators.required]],
      title: [
        this.product?.title || 'short black',
        [Validators.required, Validators.minLength(3)],
      ],
      price: [
        this.product?.price || 100,
        [Validators.required, Validators.min(0.01)],
      ],
      description: [
        this.product?.description || 'a black short with a white cord',
        [Validators.required],
      ],
      category: [this.product?.category || 'category', [Validators.required]],
      image: [
        this.product?.image ||
          'https://m.media-amazon.com/images/I/71xFz5wkbRL._AC_SX679_.jpg',
        [Validators.required, Validators.pattern(/^https?:\/\/.+/)],
      ],
    });
  }

  onSubmit() {
    if (this.formProduct.invalid) {
      this.formProduct.markAllAsTouched();
      return;
    }

    this.loadingService.show();

    const data = this.formProduct.value;

    const service =
      data?.id === 0
        ? this.productService.add(data)
        : this.productService.update(data);

    service
      .pipe(
        finalize(() => {
          this.loadingService.hide();
        })
      )
      .subscribe({
        next: () => {
          this.dialog.open(SuccessDialog, { data: 'Se creó con exito' });
          this.dialogRef.close();
        },
        error: (err) => {
          this.dialog.open(ErrorDialog, { data: 'Ocurrio un error' });
        },
      });
  }
}
