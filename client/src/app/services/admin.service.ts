import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient,  HttpResponse,  HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
const endpoint = `http://localhost:8000/api/`;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  getAllCategories(productId:any) {
    const userId = 2;
    return this.http.delete(endpoint + "/product/"+productId+"/"+userId);
  }

  // createReward(reward: any) {
  //   return this.http.post(endpoint "add-reward", reward);
  // }


}
