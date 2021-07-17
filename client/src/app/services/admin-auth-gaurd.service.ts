
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGaurdService {

  constructor(
    public auth: AuthService, 
    public router: Router
    ) { }
    canActivate(): boolean {
      if (!this.auth.isAuthenticated()) {
        this.router.navigate(['login']);
        return false;
      }
      if(!this.auth.isAdmin()){
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }
}