import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  // productPost:any = {};

  productPost: any = {
    _id: '',
    name: '',
    price: 0,
    category: '',
    description: '',
    stock: '',
    photo: null,
  };

  categories: any = [];

  constructor(
    private route: ActivatedRoute,
    private adminservice: AdminService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    let id = this.route.snapshot.paramMap.get('id') || '';
    this.productPost._id = id;
    this.adminservice.getProduct(id).subscribe((res: any) => {
      this.productPost = res;
    });
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

  updateProduct() {
    this.adminservice
      .updateProduct(this.productPost._id, this.productPost)
      .subscribe((res) => {});
  }
}
