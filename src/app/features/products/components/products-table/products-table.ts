import { CurrencyPipe } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products-table',
  imports: [MatTableModule, CurrencyPipe],
  templateUrl: './products-table.html',
  styleUrl: './products-table.scss',
})
export class ProductsTable implements OnInit {
  listProducts: Product[] = [];
  displayedColumns: string[] = ['image', 'title', 'price', 'category'];

  constructor(
    private productService: ProductService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe((data) => {
      this.listProducts = data;
      this.cdRef.detectChanges();
    });
  }
}
