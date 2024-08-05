// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common'; // Import de CommonModule
import { ProductService } from '../service/ProductService';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], // Ajout de CommonModule aux imports
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = []; // Déclaration de la variable products

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data: any[]) => {
        this.products = data;
      },
      (error: any) => { // Spécifiez le type any ici
        console.error('Error fetching products:', error);
      }
    );
  }
}
