import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent implements OnInit {
  categoryPost = {
    name: '',
  };
  categories: any = [];

  constructor(private router: Router, private adminservice: AdminService,private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  createCategory() {
    this.adminservice.createCategory(this.categoryPost).subscribe((res:any) => {
      if(res.success){
        this.snackBar.open(`Category ${res.category.name} created.`, 'close', {
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
      this.router.navigate(['admin']);
    });
  }
  loadCategories() {
    this.adminservice.getAllCategories().subscribe((res: any) => {
      this.categories = res.items;
    });
  }
}
