import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  productPost=new FormData();
  // const formData: FormData = new FormData();
  //   formData.append('fileKey', body.photo, body.photo.name);
  //   return this.http.post(endpoint+"createproduct", formData,this.httpOptions);

  // photo = new FormData(); 

  categories:any = [];

  constructor(private http:HttpClient, private authservice:AuthService, private adminservice:AdminService) { }

  ngOnInit(): void {
    this.loadCategories();
  }
  
  loadCategories(){
    this.adminservice.getAllCategories().subscribe((res:any)=>{
      this.categories = res.items;
      console.log(res);
    });
  }

  handleChange(name: any, event:any) {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    console.log(value);
    this.productPost.set(name, value);
}


  // selectImage1(event:any) {
  //   console.log(event.target.files);
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.photo.append("photo",file);
  //     // this.productPost.photo = file;
  //   }
  // }

  // selectCat(event:any) {
  //   const cat = event;
  //   this.productPost.category = cat; 
  // }

  createProduct(){
    console.log(this.productPost.getAll('name'));

    this.adminservice.createProduct(this.productPost).subscribe(res=>{
      console.log("RESPONSE FROM BACKEND ");
      console.log(res);
    });
  }

  //  createProduct() {

  //   let {user, token} =  this.authservice.getSignedInUser();

  //   const API = `http://localhost:8000/api`;
  //   // console.log(product);
  //   try {
  //       const res = this.http.post(`${API}/product/create/${user._id}`,
  //           {
  //               method: "POST",
  //               headers: {
  //                   Accept: "application/json",
  //                   Authorization: `Bearer ${token}`
  //               },
  //               body: this.productPost
                
  //           }
  //       );
  //       // console.log(product);
  //       console.log(res);
        
  //       // return res.json();
  //   } catch (err) {
  //       console.log(err);
  //   }
  // }

  
}
