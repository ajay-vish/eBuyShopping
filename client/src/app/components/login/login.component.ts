import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService) { }

  loginPost = {
    email:"",
    password:"",
  }
  ngOnInit(): void {
  }

  login(){
    // ajay's code
    // this.auth.signIn({email:"admin@gmail.com", password: "admin"}).subscribe((resp) => {
    //   console.log(resp);
    // })
    this.auth.signIn(this.loginPost).subscribe((resp) => {
      console.log(resp);
    })
  }

}
