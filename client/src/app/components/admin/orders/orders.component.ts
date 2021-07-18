import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion | null = null;
  panelOpenState = false;
  status = ['Received', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  order: any;
  disableSelect = new FormControl(false);
  
  constructor(
    private admin: AdminService
  ) {}
  orders: any;
  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(){
    this.admin.getOrders().subscribe((resp: any) => {
      this.orders = resp;
    })
  }
  selectOrder(event: any, orderId: any){
    this.admin.changeStatus(orderId,event).subscribe((resp: any) => {
    })
  }
}
