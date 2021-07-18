import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient,  HttpResponse,  HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
const endpoint = `http://localhost:8000/api/`;

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  httpFormOptions = {headers: new HttpHeaders({
    'Accept':  'multipart/form-data',
    'Authorization': '' })};
  httpOptions = {headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': '' })};
  constructor(private auth:AuthService, private http:HttpClient) { }

  getAllProducts() {
    return this.http.get(endpoint + "products");
  }
  getAllCategories() {
    return this.http.get(endpoint + "categories");
  }

  getProduct(id:any) {
    let {user, token} = this.auth.getSignedInUser();
    // this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+token);
    return this.http.get(endpoint+"/product/"+id);
  }

  updateProduct(id:any, body:any) {
    let {user, token} = this.auth.getSignedInUser();
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+token);
    return this.http.put(endpoint+"/product/"+id+"/"+user._id, body, this.httpOptions);
  }
  createProduct(body:any) { 
    let {user, token} = this.auth.getSignedInUser();
    this.httpFormOptions.headers = this.httpFormOptions.headers.set('Authorization', 'Bearer '+token);
    let form = new FormData()
    for(var key in body){
      form.append(key, body[key]);
    }
    return this.http.post(endpoint+"product/create/" + user._id, form, this.httpFormOptions);
  }

  getCategory(id:any) {
    let {user, token} = this.auth.getSignedInUser();
    // this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+token);
    return this.http.get(endpoint+"/category/"+id);
  }

  updateCategory(id:any, body:any) {
    let {user, token} = this.auth.getSignedInUser();
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+token);
    return this.http.put(endpoint+"/category/"+id+"/"+user._id, body, this.httpOptions);
  }

  createCategory(body:any) { 
    let {user, token} = this.auth.getSignedInUser();
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+token);
    return this.http.post(endpoint+"/category/create/" + user._id, body, this.httpOptions);
  }



}
