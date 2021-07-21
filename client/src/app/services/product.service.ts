import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import  endpoint  from '../config';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private auth : AuthService) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: '',
    }),
  };

  getProducts(): Observable<any> {
    return this.http.get(endpoint + 'displayproducts').pipe(
      map((res) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }
  getProductsByCategory(categoryId: any): Observable<any> {
    return this.http.get(endpoint + 'products/category/'+categoryId).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  getHomeProducts(): Observable<any> {
    return this.http.get(endpoint + 'displayproducts').pipe(
      map((res) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  getProduct(id: any): Observable<any> {
    return this.http.get(endpoint + 'product/' + id).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  getMyOrders(id: any, token: any): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      'Bearer ' + token
    );
    return this.http
      .get(endpoint + '/order/myorders/' + id, this.httpOptions)
      .pipe((res) => {
        return res;
      }, catchError(this.handleError));
  }

  cancelOrder(orderId: any, status: any) {
    let { user, token } = this.auth.getSignedInUser();
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      'Bearer ' + token
    );
    return this.http.put(
      endpoint + `cancel/${orderId}/status/${user._id}`,
      {
        orderId: orderId,
        status: status
      },
      this.httpOptions
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
