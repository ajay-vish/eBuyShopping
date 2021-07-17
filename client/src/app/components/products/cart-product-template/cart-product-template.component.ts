import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-product-template',
  templateUrl: './cart-product-template.component.html',
  styleUrls: ['./cart-product-template.component.css']
})
export class CartProductTemplateComponent implements OnInit {

  constructor(
    private productService: ProductService
  ) { }
  @Input()
  productData: any;
  product: any;
  isLoading = false;
  ngOnInit(): void {
    this.productService.getProduct(this.productData._id).subscribe((resp: any) => {
      this.product = resp;
      this.isLoading = true;
    })
  }

}
