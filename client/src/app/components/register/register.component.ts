import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth:AuthService) { }
registerPost= {
  name:"",
  email:"",
  password:"",
}
  ngOnInit(): void {
  }

  register(){
    console.log(this.registerPost);
    this.auth.signUp(this.registerPost)
    .subscribe((res:any)=>{
      console.log(res);
    });
  }

}
