import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

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

  isPhotoValid: boolean = false;
  categories: any = [];

  constructor(private adminservice: AdminService,private snackBar: MatSnackBar) {}

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
      if(file.type.split("/")[0] == 'image'){
        this.productPost.photo = file;
        this.isPhotoValid = true
      }else{
        this.snackBar.open('Only image file supported', 'close', {
          duration: 2000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    }
  }

  selectCat(event: any) {
    const cat = event;
    this.productPost.category = cat;
  }

  createProduct() {
    if(this.isPhotoValid){
      this.adminservice.createProduct(this.productPost).subscribe((res: any) => {
        if(res.success){
      
        this.snackBar.open('Product created successfully!!👍', 'close', {
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
    }else{
      this.snackBar.open("Please select an Image to upload", 'close', {
        duration: 2000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }


  


}
