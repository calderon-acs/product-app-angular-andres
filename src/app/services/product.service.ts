import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../features/products/models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `https://fakestoreapi.com/products`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  add(product: Product): Observable<Product> {
     return this.http.post<Product>(this.apiUrl, product);
  }

  update(product: Product): Observable<Product> {
     return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  delete(id:number): Observable<Product[]> {
    return this.http.delete<Product[]>(`${this.apiUrl}/${id}`);
  }
}
