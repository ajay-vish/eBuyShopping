import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { MatAccordion } from '@angular/material/expansion';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-cart-template',
  templateUrl: './cart-template.component.html',
  styleUrls: ['./cart-template.component.css'],
})
export class CartTemplateComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion | null = null;
  isEmpty:boolean = true;
  panelOpenState = false;
  constructor(
    private productService: ProductService,
    private auth: AuthService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  
  orders: any;
  ngOnInit(): void {
   
    this.loadOrders()
  }

  loadOrders(){
    const { user, token } = this.auth.getSignedInUser();
    this.productService.getMyOrders(user._id, token).subscribe((resp: any) => {
      this.orders = resp;
      if(!this.orders.length) {
        this.isEmpty= true; 
      }
    });
  }
  cancelOrder(orderId: any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if(result){
        this.productService.cancelOrder(orderId, 'Cancelled').subscribe((resp: any) => {
            if(resp.success){
              this.snackBar.open("Order has been cancelled! Refund will be provided shortly", '', {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
              this.loadOrders()
            }else{
              this.snackBar.open(resp.error, 'close', {
                duration: 2000,
                panelClass: ['error-snackbar'],
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
            }
        })
      }
    });
  }
}
