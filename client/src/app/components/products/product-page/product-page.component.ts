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
      var groupBy = function(xs : any, key: any) {
        return xs.reduce(function(rv: any, x: any) {
          (rv[x[key].name] = rv[x[key].name] || []).push(x);
          return rv;
        }, {});
      };
      var groubedBy=groupBy(resp.data, 'category');
      let res = [];
      for(var key in groubedBy){
        res.push(groubedBy[key])
      }
      console.log(res)
      this.products = res;
    });
  }

}
