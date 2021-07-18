import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  registerPost = {
    name: '',
    email: '',
    password: '',
  };
  ngOnInit(): void {}

  register() {
    this.auth.signUp(this.registerPost).subscribe((res: any) => {
      this.auth.signIn(this.registerPost).subscribe((res1: any) => {
        this.router.navigate(['home']);
      });
    });
  }
}
