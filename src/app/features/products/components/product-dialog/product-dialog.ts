import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatError, MatInputModule } from '@angular/material/input';
import { Product } from '../../models/product.model';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../services/product.service';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDialog implements OnInit {
  formProduct!: FormGroup;
  producto!: Product;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.formProduct = this.fb.group({
      id: [this.producto?.id || 0, [Validators.required]],
      title: [
        this.producto?.title || 'short black',
        [Validators.required, Validators.minLength(3)],
      ],
      price: [
        this.producto?.price || 100,
        [Validators.required, Validators.min(0.01)],
      ],
      description: [
        this.producto?.description || 'a black short with a white cord',
        [Validators.required],
      ],
      category: [this.producto?.category || 'category', [Validators.required]],
      image: [
        this.producto?.image ||
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

    const peticion = this.productService.add(data);

    peticion.subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
