import { Component, OnInit } from '@angular/core';
import { PaymentFormComponent } from '../../payment-form/payment-form.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    public dialog: MatDialog
    ) { }


  ngOnInit(): void {
    this.loadCart();
  }
  cart_total = 0;
  
  products:any = [];  
  isEmpty = true;


  loadCart() {
    if (localStorage.getItem("cart")) {
      this.products = JSON.parse(localStorage.getItem("cart") || "")
      this.getFinalAmount();
      this.isEmpty = false;
    }
  }

  getFinalAmount() {
    let amount = 0
    this.products.map((p: { price: number; count: number; }) => {
        amount = amount + (p.price * p.count)
    })
    this.cart_total = amount;
}

  removeItem(productId: any) {
  

    this.products.map((product:any, i:any) => {
        if (product._id === productId) {
          this.products.splice(i, 1)
        }
    })
    localStorage.setItem("cart", JSON.stringify(this.products));

    this.loadCart();
  }
  increaseQty(productId:any){
    
    let index = this.products.findIndex((obj: { _id: any; }) => obj._id===productId)
 
    this.products[index].count = this.products[index].count +1;
    localStorage.setItem("cart", JSON.stringify(this.products));

    this.getFinalAmount();
  }

  decreaseQty(productId:any){

  
    
    let index = this.products.findIndex((obj: { _id: any; }) => obj._id===productId)
    console.log(index+"indexxxx");
    if(this.products[index].count > 1){
        this.products[index].count = this.products[index].count - 1;
    }
    else{
      this.removeItem(productId);
    }
    localStorage.setItem("cart", JSON.stringify(this.products));

    this.getFinalAmount();
  }


  onOpenDialogue() {
    console.log("opening")
    this.getFinalAmount();
    const dialogRef = this.dialog.open(PaymentFormComponent, {
      data: {
        amount: this.cart_total
      },
      height: '350px',
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadCart();
    });
  }

}
