import {Component, OnDestroy, OnInit} from '@angular/core';
import { ShoppingCartService } from "../services/shopping-cart.service";
import { Subscription } from "rxjs/Subscription";
import { OrderService } from "../services/order.service";
import {AuthService} from "../services/auth.service";
import {ShoppingCart} from "../models/shopping-cart";
import {Router} from "@angular/router";

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy{
  shipping = {};
  cart: ShoppingCart;
  userId: string;
  cartSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
              private authService: AuthService,
              private router: Router,
              private shoppingCartService: ShoppingCartService,
              private orderService: OrderService) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.valueChanges().subscribe(cart => {this.cart = cart});
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);

  }

  async placeOrder() {
    let order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items
    };

    let result = await this.orderService.placeOrder(order);
    this.shoppingCartService.clearCart().then(success => {
      this.router.navigate(['/order-success', result.key]);
    });
  }

  ngOnDestroy() {
   this.cartSubscription.unsubscribe();
   this.userSubscription.unsubscribe();
  }
}
