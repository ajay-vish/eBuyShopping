import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  constructor(public ProductService:ProductService) { }

  products: any[] = [];

  ngOnInit(): void {
      this.getProducts();
  }

  getProducts(): void {
    this.ProductService.getProducts().subscribe((resp: any) => {
      this.products = resp;
      console.log(this.products);
    });
  }

}
