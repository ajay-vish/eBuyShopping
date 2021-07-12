import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-display-product',
  templateUrl: './display-product.component.html',
  styleUrls: ['./display-product.component.css']
})
export class DisplayProductComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public productService:ProductService
  ) { }

  isLoading: boolean= true;
  id: any;
  product: any;
  cart: any = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getProduct(this.id)
    });
    
  }
  getProduct(id :any){
    this.productService.getProduct(id).subscribe((resp: any) => {
      this.product = resp;
      this.isLoading = false;
    })
  }
  addToCart(){
    this.cart.push(this.product._id);
    localStorage.setItem("cart",this.cart);
  }
}
