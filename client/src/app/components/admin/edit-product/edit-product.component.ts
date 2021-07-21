import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import { FormGroup } from '@angular/forms';

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
    available:Boolean ,
  };
  photo:any;
  categories: any = [];

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private adminservice: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    let id = this.route.snapshot.paramMap.get('id') || '';
    this.productPost._id = id;
    this.adminservice.getProduct(id).subscribe((res: any) => {
      delete res['photo'];
      this.productPost = res;
     
      this.productPost.category = this.productPost.category._id;
    });
  }

  loadCategories() {
    this.adminservice.getAllCategories().subscribe((res: any) => {
      this.categories = res.items;
    });
  }

  is_photo_selected:boolean = false;
  selectImage1(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if(file.type.split("/")[0] == 'image'){
        this.photo = file;
        this.is_photo_selected = true;
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
    const cat = event.target.value;
   
    this.productPost.category = cat;
  }

  updateProduct() {

    
  
    
    this.adminservice
      .updateProduct(this.productPost._id, this.productPost, this.photo, this.is_photo_selected)
      .subscribe((res:any) => {
       
        if(res.success){
          this.snackBar.open('Product details updated!!👍', 'close', {
            duration: 2000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.router.navigate(['/admin']);
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

  deleteProduct(){
    this.adminservice
    .deleteProduct(this.productPost._id)
    .subscribe((res: any) => {
      
      
     
      if(res.success){
        this.snackBar.open('Product details updated!!👍', 'close', {
          duration: 2000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        // this.router.navigate(['/admin']);
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
