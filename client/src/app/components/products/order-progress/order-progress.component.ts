import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-progress',
  templateUrl: './order-progress.component.html',
  styleUrls: ['./order-progress.component.css'],
})
export class OrderProgressComponent implements OnInit {
  constructor() {}
  @Input()
  orderStatus: string = '';

  counts = [
    'Received',
    'In Progress',
    'Ready for Billing',
    'Billed',
    'Order Closed',
  ];

  ngOnInit(): void {}
}
