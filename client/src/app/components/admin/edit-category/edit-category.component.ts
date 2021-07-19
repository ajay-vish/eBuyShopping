import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit {
  categoryPost = {
    _id: '',
    name: '',
  };
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminservice: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id') || '';
    this.categoryPost._id = id;
    this.adminservice.getCategory(id).subscribe((res: any) => {
      this.categoryPost.name = res.name;
    });
  }

  editCategory() {
    this.adminservice
      .updateCategory(this.categoryPost._id, this.categoryPost)
      .subscribe((res: any) => {
        if(res.success){
          this.snackBar.open('Category details updated!!', 'close', {
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

  deleteCategory() {
    this.adminservice
      .deleteCategory(this.categoryPost._id)
      .subscribe((res: any) => {
        console.log(res);        
        this.router.navigate(['/admin']);
      });
  }
  

}
