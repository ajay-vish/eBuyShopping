import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  categoryPost = {
    _id:"",
    name:""
  }
  constructor(private route: ActivatedRoute, private router:Router, private adminservice:AdminService) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id') || "";
    this.categoryPost._id  = id;
    console.log("ID"+id)
    this.adminservice.getCategory(id).subscribe((res:any)=>{
      console.log(res);
      this.categoryPost.name = res.name;
    });
  }

  editCategory(){
    this.adminservice.updateCategory(this.categoryPost._id, this.categoryPost).subscribe((res:any)=>{
      console.log(res);
      this.router.navigate(['/admin']);
    });
  }

}
