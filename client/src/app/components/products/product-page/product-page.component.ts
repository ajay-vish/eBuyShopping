import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  constructor(public ProductService: ProductService, ) {}

  products: any[] = [];
  productMain: any[] = [];
  temp: any;
  search = '';
  ngOnInit(): void {
    this.getProducts();
  }

  groupProducts(resp: any){
    var groupBy = function (xs: any, key: any) {
      return xs.reduce(function (rv: any, x: any) {
        (rv[x[key].name] = rv[x[key].name] || []).push(x);
        return rv;
      }, {});
    };
    var groubedBy = groupBy(resp, 'category');
    let res = [];
    for (var key in groubedBy) {
      res.push(groubedBy[key]);
    }
    return res;
  }

  getProducts(): void {
    this.ProductService.getProducts().subscribe((resp: any) => {
      this.products = this.groupProducts(resp.data);
      this.productMain = resp.data;
    });
  }

  onKeydown() {
    this.temp = [];
    if(this.search == ''){
      this.products = this.groupProducts(this.productMain);
    }else{
      for(let i = 0; i < this.productMain.length; i++){
        let product = this.productMain[i].name.toUpperCase();
        let category = this.productMain[i].category.name.toUpperCase();
        let search = this.search.toUpperCase();
        if(product.match(search) || category.match(search)){
          this.temp.push(this.productMain[i]);
        }
      }
      this.products = this.groupProducts(this.temp);
    }
  }

 
}
