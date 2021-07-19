import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import {
  HttpClient,
  HttpResponse,
  HttpRequest,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
const endpoint = `http://localhost:8000/api/`;

@Injectable({
  providedIn: 'root',
})

export class AdminService {
  httpFormOptions = {
    headers: new HttpHeaders({
      Accept: 'multipart/form-data',
      Authorization: '',
    }),
  };
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: '',
    }),
  };
  constructor(private auth: AuthService, private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(endpoint + 'products');
  }
  getAllCategories() {
    return this.http.get(endpoint + 'categories');
  }

  getProduct(id: any) {
    let { user, token } = this.auth.getSignedInUser();
    // this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+token);
    return this.http.get(endpoint + '/product/' + id);
  }

  updateProduct(id: any, body: any, photo:any, is_photo_selected:boolean) {
    let { user, token } = this.auth.getSignedInUser();
    this.httpFormOptions.headers = this.httpFormOptions.headers.set(
      'Authorization',
      'Bearer ' + token

    );
    console.log(body);
    console.log("BODY");
    
    
    
    let form = new FormData();
    for (var key in body) {
      form.append(key, body[key]);
    }

    console.log("PHOTO");
    console.log(photo);
    if(is_photo_selected){
      form.append('photo', photo);
    }
    
    return this.http.put(
      endpoint + '/product/' + id + '/' + user._id,
      form,
      this.httpFormOptions
    );
  }

  createProduct(body: any) {
    let { user, token } = this.auth.getSignedInUser();
    this.httpFormOptions.headers = this.httpFormOptions.headers.set(
      'Authorization',
      'Bearer ' + token
    );
    let form = new FormData();
    for (var key in body) {
      form.append(key, body[key]);
    }

    return this.http.post(
      endpoint + 'product/create/' + user._id,
      form,
      this.httpFormOptions
    );
  }

  deleteProduct(id: any){
    let { user, token } = this.auth.getSignedInUser();
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      'Bearer ' + token
    );
    return this.http.delete(
      endpoint + '/product/' + id + '/' + user._id,
      this.httpOptions
    );
  }

  getCategory(id: any) {
    let { user, token } = this.auth.getSignedInUser();
    // this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+token);
    return this.http.get(endpoint + '/category/' + id);
  }

  updateCategory(id: any, body: any) {
    let { user, token } = this.auth.getSignedInUser();
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      'Bearer ' + token
    );
    return this.http.put(
      endpoint + '/category/' + id + '/' + user._id,
      body,
      this.httpOptions
    );
  }

  deleteCategory(id: any){
    let { user, token } = this.auth.getSignedInUser();
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      'Bearer ' + token
    );
    return this.http.delete(
      endpoint + '/category/' + id + '/' + user._id,
      this.httpOptions
    );
  }

  createCategory(body: any) {
    let { user, token } = this.auth.getSignedInUser();
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      'Bearer ' + token
    );
    return this.http.post(
      endpoint + '/category/create/' + user._id,
      body,
      this.httpOptions
    );
  }

  getOrders() {
    let { user, token } = this.auth.getSignedInUser();
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      'Bearer ' + token
    );
    return this.http.get(
      endpoint + 'order/all/' + user._id,
      this.httpOptions
    );
  }

  changeStatus(orderId: any, status: any) {
    let { user, token } = this.auth.getSignedInUser();
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      'Bearer ' + token
    );
    return this.http.put(
      endpoint + `order/${orderId}/status/${user._id}`,
      {
        orderId: orderId,
        status: status
      },
      this.httpOptions
    );
  }
}
