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

  counts = ['Received', 'Processing', 'Shipped', 'Delivered'];

  ngOnInit(): void {}
}
