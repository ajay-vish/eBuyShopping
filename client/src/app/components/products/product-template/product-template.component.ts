import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
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
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProduct(this.product._id).subscribe((resp: any) => {
      this.photo = resp.photo.contentType;
    })
  }
}
