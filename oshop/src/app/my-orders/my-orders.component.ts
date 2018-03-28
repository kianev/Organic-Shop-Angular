import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {OrderService} from "../services/order.service";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private authService: AuthService, private orderService: OrderService) {
    }

  ngOnInit() {
    this.orderService.getOrders().valueChanges().subscribe(orders => {
      this.authService.user$.subscribe(user => {
        orders.forEach(order => {
          if((order as any).userId === user.uid){
            this.orders.push(order);
          }
        });
      })
    });
  }

}
