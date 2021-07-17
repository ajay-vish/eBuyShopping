import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  orderData : any = {
    products : [""]
  }

  constructor(
    private productService: ProductService,
    private auth: AuthService
    ) { }

  ngOnInit(): void {
    this.auth.signIn({email:"admin@gmail.com", password: "admin"}).subscribe((resp) => {
      console.log(resp);
    })
    let user = localStorage.getItem("jwt") ?? "";
    let userData = JSON.parse(user);
    // this.productService.buyProduct(userData._id, JSON.stringify({ order: this.orderData })).subscribe((resp) => {
    //   console.log(resp)
    // })
  }

}
