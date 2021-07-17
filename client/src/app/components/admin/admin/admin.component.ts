import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products:any = [];
  categories:any = [];
  constructor(private service:AdminService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(){
     this.service.getAllProducts().subscribe((res:any)=>{
       
      
      this.products = res.data;


     });
    //  this.products.array.forEach((product:any) => {
      
    //  });
  }
  loadCategories(){
    this.service.getAllCategories().subscribe((res:any)=>{
      this.categories = res.data;
      console.log(res);
    });
  }
}