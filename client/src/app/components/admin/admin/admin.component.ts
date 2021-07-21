import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})

export class AdminComponent implements OnInit {
  products: any = [];
  productMain: any = [];
  categories: any = [];
  category = "";
  search = "";
  constructor(private ps: ProductService, private service: AdminService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.service.getAllProducts().subscribe((res: any) => {
      this.products = res.data;
      this.productMain = res.data;
      console.log(res.data);
      
    });
  }

  loadCategories() {
    this.service.getAllCategories().subscribe((res: any) => {
      this.categories = res.items;
    });
  }
  onKeydown(event: any) {
    let temp = [];
    console.log(event)
    if(this.search == ''){
      this.products = this.productMain;
    }else{
      for(let i = 0; i < this.productMain.length; i++){
        let product = this.productMain[i].name.toUpperCase();
        let category = this.productMain[i].category.name.toUpperCase();
        let search = this.search.toUpperCase() +
        (event.key.length == 1 ? event.key.toUpperCase() : "");
        if(product.match(search) || category.match(search)){
          temp.push(this.productMain[i]);
        }
      }
      this.products = temp;
    }
  }

  onSearchByCat(cname: string) {  
    this.category = cname;  
    let temp = [];
    for(let i = 0; i < this.productMain.length; i++){
      let category = this.productMain[i].category.name.toUpperCase();
      let search = cname.toUpperCase();
      if(category.match(search)){
        temp.push(this.productMain[i]);
      }
    }
    this.products = temp;
  }
}
