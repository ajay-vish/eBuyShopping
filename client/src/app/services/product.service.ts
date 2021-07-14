import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
const endpoint = `http://localhost:8000/api/`;

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  
  constructor(private http: HttpClient) { }

  

  getProducts(): Observable<any> {
    return this.http.get(endpoint + 'products')
    .pipe(
      map((res)=>{
        return res;
      }),
      catchError(this.handleError)
    );
  }

  getProduct(id: any): Observable<any> {
    return this.http.get(endpoint + 'product/'+ id)
    .pipe(
      map((res)=>{
        return res;
      }),
      catchError(this.handleError)
    );
  }

  buyProduct(id: any, order: any) : Observable<any> {
    return this.http.post(endpoint + 'order/create/'+ id, order)
    .pipe(
      map((res)=>{
        return res;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  
}
