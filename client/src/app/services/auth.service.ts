import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
const endpoint = `http://localhost:8000/api/`;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  isExpired: boolean = true;
  public jwt: JwtHelperService = new JwtHelperService()
  constructor(
    private http: HttpClient
    ) { }

  signIn(user: any): Observable<any> {
    return this.http.post(endpoint + 'signin',user)
    .pipe(
      map((res: any)=>{
        localStorage.setItem("jwt",JSON.stringify({token: res.token,user: res.user}));
        this.user = res.user;
        return res;
      }),
      catchError(this.handleError)
    );
  }

  signUp(user: any): Observable<any> {
    return this.http.post(endpoint + 'signup',user)
    .pipe(
      map((res: any)=>{
        return res;
      }),
      catchError(this.handleError)
    );
  }

  isAuthenticated(){
    this.authToken =  JSON.parse(localStorage.getItem("jwt") || "");
    if(this.authToken)
    this.isExpired = this.jwt.isTokenExpired(this.authToken.token);
    return this.isExpired;
  }

  isSignedIn(){
    this.authToken =  JSON.parse(localStorage.getItem("jwt") || "");
    if(this.authToken)
      return true;
    return false;
  }

  getSignedInUser(){
    this.authToken = JSON.parse(localStorage.getItem("jwt") || "");
    if(this.authToken)
    this.user = this.authToken.user;
    return this.user;
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
