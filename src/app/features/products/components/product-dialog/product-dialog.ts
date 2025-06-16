import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatError, MatInputModule } from '@angular/material/input';
import { Product } from '../../models/product.model';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/products.service';

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

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProductDialog>,
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

    const data = this.formProduct.value;

    this.productService.save(data).subscribe({
      next: () => this.dialogRef.close(),
    });
  }
}
