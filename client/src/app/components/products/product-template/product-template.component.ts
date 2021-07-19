import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-product-template',
  templateUrl: './product-template.component.html',
  styleUrls: ['./product-template.component.css'],
})
export class ProductTemplateComponent implements OnInit {
  @Input()
  product: any = {};
  photo = 'assets/images/loading.gif';
  jwt: any;
  cart: any;
  constructor(private productService: ProductService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.productService.getProduct(this.product._id).subscribe((resp: any) => {
      this.photo = resp.photo.contentType;
      this.product = resp;
    })
  }


  // if add to cart functionality is to be used
  //uncomment below code

  // addItemToCart(item: { _id: any }, event:any) {
  //   event.stopPropagation()
  //   let cart = [];
  //   if (typeof window !== undefined) {
  //     if (localStorage.getItem('cart')) {
  //       cart = JSON.parse(localStorage.getItem('cart') || '');
  //     }
  //     if (!this.checkAlreadyInCart(cart, item)) {
       
  //       cart.push({
  //         ...item,
  //         count: 1,
  //       });
  //       this.snackBar.open('Item added to cart!', 'close', {
  //         duration: 2000,
  //         panelClass: ['success-snackbar'],
  //         horizontalPosition: 'center',
  //         verticalPosition: 'top',
  //       });
  //     }
  //     else{
  //       this.snackBar.open('Item already in cart!', 'close', {
  //         duration: 2000,
  //         panelClass: ['warning-snackbar'],
  //         horizontalPosition: 'center',
  //         verticalPosition: 'top',
  //       });
  //     }
  //     localStorage.setItem('cart', JSON.stringify(cart));
  //   }
  // }

  // checkAlreadyInCart(cart: any[], item: { _id: any }) {
  //   if (
  //     cart.filter((product: { _id: any }) => {
  //       return product._id === item._id;
  //     }).length > 0
  //   ) {
  //     return true;
  //   }
  //   return false;
  // }
}
