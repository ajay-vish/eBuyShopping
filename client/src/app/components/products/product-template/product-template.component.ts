import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-template',
  templateUrl: './product-template.component.html',
  styleUrls: ['./product-template.component.css']
})
export class ProductTemplateComponent implements OnInit {

  @Input()
  product: any = {};
  jwt: any;
  cart: any;
  constructor(
    private payment: PaymentService,
    private auth: AuthService
    ) { }

  ngOnInit(): void {
    
  }

  buyNow(){
    this.jwt = this.auth.getSignedInUser();
    this.cart = JSON.parse(localStorage.getItem("cart") || "")
    this.payment.createOrder(this.jwt.user._id,{products: this.cart},this.jwt.token).subscribe((resp:any)=>{
      console.log(resp);
    })
  }
}

