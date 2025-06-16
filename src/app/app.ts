import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ProductsCard } from "./features/products/pages/products-card/products-card";

@Component({
  selector: 'app-root',
  imports: [MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, ProductsCard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'product-app-angular-andres';
}
