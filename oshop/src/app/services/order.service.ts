import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase) { }

  placeOrder(order) {
   return this.db.list('/orders').push(order);
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref => ref.orderByChild('userId'));
  }

  getOrders() {
    return this.db.list('/orders');
  }

}
