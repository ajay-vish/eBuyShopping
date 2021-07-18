import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  productPost: any = {
    name: '',
    price: 0,
    category: '',
    description: '',
    stock: '',
    photo: null,
  };

  categories: any = [];

  constructor(private adminservice: AdminService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.adminservice.getAllCategories().subscribe((res: any) => {
      this.categories = res.items;
    });
  }
  selectImage1(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productPost.photo = file;
    }
  }
  selectCat(event: any) {
    const cat = event;
    this.productPost.category = cat;
  }

  createProduct() {
    this.adminservice.createProduct(this.productPost).subscribe((res: any) => {
      if(res.success){
      console.log("Product created successfully!!!!");
      alert("Product created successfully!!!!");
      }
    });
  }
}
