import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../service/ProductService';
import { OfferService } from '../service/OfferService';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule, BrowserAnimationsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  offers: any[] = [];
  productForm: FormGroup;
  isEditing: boolean = false;
  currentProductId: number | null = null;

  constructor(
    private productService: ProductService,
    private offerService: OfferService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: [''],
      description: [''],
      price: [null, Validators.required],
      offer: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadOffers();
    this.snackBar.open('Component loaded successfully!', 'Close', {
      duration: 3000,
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.error('Error loading products', error);
      }
    );
  }

  loadOffers(): void {
    this.offerService.getOffers().subscribe(
      (response) => {
        this.offers = response;
      },
      (error) => {
        console.error('Error loading offers', error);
      }
    );
  }

  submitForm(): void {
    if (this.productForm.valid) {
      const formData = {
        ...this.productForm.value,
        offer: this.productForm.value.offer
          ? { id: this.productForm.value.offer }
          : null, // Send only the offer ID
      };

      console.log('Form Data:', formData); // Log the form data to verify its structure

      if (this.isEditing && this.currentProductId !== null) {
        this.productService
          .updateProduct(this.currentProductId, formData)
          .subscribe(
            (response) => {
              console.log('Product updated successfully', response);
              this.loadProducts();
              this.resetForm();
              this.snackBar.open('Product updated successfully!', 'Close', {
                duration: 3000,
              }); // Show success message
            },
            (error) => {
              console.error('Error updating product', error);
              this.snackBar.open('Error updating product', 'Close', {
                duration: 3000,
              }); // Show error message
            }
          );
      } else {
        this.productService.addProduct(formData).subscribe(
          (response) => {
            console.log('Product added successfully', response);
            this.loadProducts();
            this.productForm.reset();
            this.snackBar.open('Product added successfully!', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });

            console.log('Displaying success message');
            console.log('Success message displayed');
          },
          (error) => {
            console.error('Error adding product', error);
            this.snackBar.open('Error adding product', 'Close', {
              duration: 3000,
            }); // Show error message
          }
        );
      }
    } else {
      console.warn('Form is invalid');
      this.snackBar.open('Please fill out the form correctly', 'Close', {
        duration: 3000,
      }); // Show form validation error message
    }
  }

  editProduct(product: any): void {
    this.isEditing = true;
    this.currentProductId = product.id;
    this.productForm.patchValue({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      offer: product.offer?.id,
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      (response) => {
        console.log('Product deleted successfully', response);
        this.loadProducts();
        this.snackBar.open('Product deleted successfully!', 'Close', {
          duration: 3000,
        }); // Show success message
      },
      (error) => {
        console.error('Error deleting product', error);
        this.snackBar.open('Error deleting product', 'Close', {
          duration: 3000,
        }); // Show error message
      }
    );
  }

  resetForm(): void {
    this.isEditing = false;
    this.currentProductId = null;
    this.productForm.reset();
  }
}
