import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  addProduct(product: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl, product).pipe(
      catchError(this.handleError)
    );
  }
  
  updateProduct(id: number, product: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, product).pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Handle different error responses here
    return throwError('Something went wrong; please try again later.');
  }
}
