import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {MatMenuModule} from '@angular/material/menu'; 
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit {  
  location: any;
  categories:any;
  constructor(private auth: AuthService,private adminService: AdminService, public router: Router, public matMenu : MatMenuModule) {
    router.events.subscribe((val) => {
      this.loadNavbar();
      this.loadCategories()
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

  loadCategories(){
    this.adminService.getAllCategories().subscribe((resp:any) =>{
      this.categories = resp.items;
    
      
    })
  }

  gotoCategory(name:any,id:any): void{
    this.router.navigate(['/view/'+name.toLowerCase().replace(':','').split(' ').join('-')], { queryParams: { id: id } })
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
}
