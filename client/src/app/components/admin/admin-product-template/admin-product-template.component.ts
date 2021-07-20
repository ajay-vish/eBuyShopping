import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-product-template',
  templateUrl: './admin-product-template.component.html',
  styleUrls: ['./admin-product-template.component.css']
})
export class AdminProductTemplateComponent implements OnInit {

  constructor(private productService: ProductService) { }
  @Input()
  p: any;
  photo = 'assets/images/loading.gif';
  ngOnInit(): void {
    this.productService.getProduct(this.p._id).subscribe((resp: any) => {
      this.photo = resp.photo.contentType;
    })
  }

}
