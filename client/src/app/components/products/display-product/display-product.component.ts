import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-display-product',
  templateUrl: './display-product.component.html',
  styleUrls: ['./display-product.component.css']
})
export class DisplayProductComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public productService:ProductService,
    public userService:UserService
  ) { }

  isLoading: boolean= true;
  id: any;
  product: any;
  user: any = {
    name:"Ajay",
    email:"a@gmail.com",
    password:"admin"
  }
  login: any = {
    email:"a@gmail.com",
    password:"admin"
  }
  cart: any = {
    products: []
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getProduct(this.id);
    });
    this.signIn()
    this.signUp()
  }
  signIn(){
    this.userService.signIn(this.login).subscribe((resp: any) => {
      console.log(resp)
    })
  }
  signUp(){
    this.userService.signUp(this.user).subscribe((resp: any) => {
      console.log(resp)
    })
  }
  getProduct(id :any){
    this.productService.getProduct(id).subscribe((resp: any) => {
      this.product = resp;
      this.isLoading = false;
    })
  }
  addToCart(){
    let cart = localStorage.getItem("cart") ? localStorage.getItem("cart") : "{products:[]}";
    // let cartData = JSON.parse(cart);
    this.cart.products.push(this.product._id);
    localStorage.setItem("cart",JSON.stringify(this.cart));
  }
}
