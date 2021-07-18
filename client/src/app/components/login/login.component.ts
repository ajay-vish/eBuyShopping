import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router,private snackBar: MatSnackBar) {}

  loginPost = {
    email: '',
    password: '',
  };
  ngOnInit(): void {}

  login() {
    this.auth.signIn(this.loginPost).subscribe((resp:any) => {
      
      if(resp.error){
        this.snackBar.open(resp.error, 'Try again', {
          duration: 2000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
      else{
        this.snackBar.open('Login successfull!!', '', {
          duration: 2000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.router.navigate(['/home']);
      }
    });
  }
}
