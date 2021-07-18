import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';

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
    private adminservice: AdminService,
    private snackBar: MatSnackBar
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
      .subscribe((res:any) => {
        if(res.success){
          
          this.snackBar.open('Product details updated!!👍', 'close', {
            duration: 2000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
        else{
          
          this.snackBar.open(res.error, 'close', {
            duration: 2000,
            panelClass: ['error-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });
  }
}
