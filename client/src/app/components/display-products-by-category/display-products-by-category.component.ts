import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-display-products-by-category',
  templateUrl: './display-products-by-category.component.html',
  styleUrls: ['./display-products-by-category.component.css']
})
export class DisplayProductsByCategoryComponent implements OnInit {

  constructor(private route: ActivatedRoute, private productService : ProductService) { }

  categoryId: any
  products: any = [];
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params =>{
      this.categoryId = params.get('id')
    })
    this.loadProducts()
  }

  loadProducts() {
    this.productService.getProductsByCategory(this.categoryId).subscribe((res: any) => {
      this.products = res.data;
    
    });
  }

}