import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

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

  constructor(private router: Router, private adminservice: AdminService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  createCategory() {
    this.adminservice.createCategory(this.categoryPost).subscribe((res) => {
      this.router.navigate(['admin']);
    });
  }
  loadCategories() {
    this.adminservice.getAllCategories().subscribe((res: any) => {
      this.categories = res.items;
    });
  }
}
