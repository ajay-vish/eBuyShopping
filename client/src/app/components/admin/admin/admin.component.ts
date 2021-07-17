import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products:any = [];
  categories:any = [];
  constructor(private ps:ProductService, private service:AdminService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(){
     this.service.getAllProducts().subscribe((res:any)=>{
     
      this.products = res.data;
      console.log(res.data);
      
      // this.products.forEach((product:any) => {        
      //   this.ps.getProductImage(product._id).subscribe((res:any)=>{
      //    product.image = res;
      //   });
      // });
     });
   
  }
  loadCategories(){
    this.service.getAllCategories().subscribe((res:any)=>{
      this.categories = res.data;
      // console.log(res);
    });
  }
}