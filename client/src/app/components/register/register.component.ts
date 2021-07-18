import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router,
    private snackBar: MatSnackBar) {}

  registerPost = {
    name: '',
    email: '',
    password: '',
  };
  ngOnInit(): void {}

  register() {
    this.auth.signUp(this.registerPost).subscribe((res: any) => {
      if(res.error){
        this.snackBar.open(res.error, 'close', {
          duration: 2000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
      else{
        this.snackBar.open(res.message, 'close', {
          duration: 2000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      this.auth.signIn(this.registerPost).subscribe((resp: any) => {
        if(res.error){
          this.snackBar.open(res.error, 'close', {
            duration: 2000,
            panelClass: ['error-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
        else{
         
          this.router.navigate(['home']);
        }
      });
    }
    });
    
  }
}
