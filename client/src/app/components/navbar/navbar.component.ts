import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit {  
  location: any;

  constructor(private auth: AuthService, public router: Router) {
    router.events.subscribe((val) => {
      this.loadNavbar();
    });
  }

  ngOnInit(): void {
    this.loadNavbar();
  }

  status = -1;

  loadNavbar() {
    if (this.auth.isSignedIn()) {
      this.status = this.auth.getSignedInUser().user.role;
    } else {
      this.status = -1;
    }
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
}
