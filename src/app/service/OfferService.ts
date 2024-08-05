import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private apiUrl = 'http://localhost:8080/api/offers'; 

  constructor(private http: HttpClient) { }

  getOffers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getOffersByType(type: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/type/${type}`).pipe(
      catchError(this.handleError)
    );
  }

  createOffer(offer: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, offer).pipe(
      catchError(this.handleError)
    );
  }

  getOfferById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateOffer(id: number, offerDetails: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, offerDetails).pipe(
      catchError(this.handleError)
    );
  }

  deleteOffer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Une erreur est survenue', error);
    return throwError(error.message || 'Une erreur est survenue');
  }
}
