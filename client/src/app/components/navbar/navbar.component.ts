import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.loadNavbar();
  }

  status = -1;

  loadNavbar(){
    if(this.auth.isSignedIn()){
      console.log(this.auth.getSignedInUser());
      this.status = this.auth.getSignedInUser().role;
      
    }
    else{
      this.status = -1;
    }
    console.log(status);
  }

}
