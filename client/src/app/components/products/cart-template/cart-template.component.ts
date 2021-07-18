import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { MatAccordion } from '@angular/material/expansion';
@Component({
  selector: 'app-cart-template',
  templateUrl: './cart-template.component.html',
  styleUrls: ['./cart-template.component.css'],
})
export class CartTemplateComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion | null = null;
  panelOpenState = false;
  constructor(
    private productService: ProductService,
    private auth: AuthService
  ) {}
  orders: any;
  ngOnInit(): void {
    const { user, token } = this.auth.getSignedInUser();
    this.productService.getMyOrders(user._id, token).subscribe((resp: any) => {
      this.orders = resp;
    });
  }
}
