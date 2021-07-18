import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-display-product',
  templateUrl: './display-product.component.html',
  styleUrls: ['./display-product.component.css'],
})
export class DisplayProductComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public productService: ProductService,
    public userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  isLoading: boolean = true;
  id: any;
  product: any;
  cart: any = {
    products: [],
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.getProduct(this.id);
    });
  }

  getProduct(id: any) {
    this.productService.getProduct(id).subscribe((resp: any) => {
      this.product = resp;
      this.isLoading = false;
    });
  }

  addItemToCart(item: { _id: any }) {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart') || '');
      }
      if (!this.checkAlreadyInCart(cart, item)) {
       
        cart.push({
          ...item,
          count: 1,
        });
        this.snackBar.open('Item added to cart!', 'close', {
          duration: 2000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
      else{
        this.snackBar.open('Item already in cart!', 'close', {
          duration: 2000,
          panelClass: ['warning-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  checkAlreadyInCart(cart: any[], item: { _id: any }) {
    if (
      cart.filter((product: { _id: any }) => {
        return product._id === item._id;
      }).length > 0
    ) {
      return true;
    }
    return false;
  }
}
