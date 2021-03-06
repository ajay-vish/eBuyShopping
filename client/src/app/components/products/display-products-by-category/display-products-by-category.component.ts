import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-display-products-by-category',
  templateUrl: './display-products-by-category.component.html',
  styleUrls: ['./display-products-by-category.component.css']
})
export class DisplayProductsByCategoryComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private productService : ProductService) { 
      this.route.queryParams.subscribe(queryParams => {
        this.categoryId  = queryParams.id;
        this.loadProducts()
      });
    }

  categoryId: any;
  isLoading = true;
  isEmpty = true;
  products: any = [];
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params =>{
      this.categoryId = params.get('id')
    })
    this.loadProducts()
  }

  loadProducts() {
    this.isEmpty = true;
    this.productService.getProductsByCategory(this.categoryId).subscribe((res: any) => {
      if(res.error){
        this.router.navigate(['/404'])
      }
      this.products = res.data;
      this.isLoading=false;
      if(res.data.length){
        this.isEmpty = false
      }
    });
  }

}
