import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-template',
  templateUrl: './cart-template.component.html',
  styleUrls: ['./cart-template.component.css']
})
export class CartTemplateComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private auth: AuthService
    ) { }
  orders: any;
  counts = ["Recieved","In Progress","Ready for Billing",
  "Billed","Order Closed"];
  orderStatus = "In Progress"
  ngOnInit(): void {
    const {user, token} = this.auth.getSignedInUser();
    this.productService.getMyOrders(user._id, token).subscribe((resp:any)=>{
      this.orders = resp;
    })
  }

}
