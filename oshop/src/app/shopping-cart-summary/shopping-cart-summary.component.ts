import {Component, Input, OnInit} from '@angular/core';
import {ShoppingCart} from "../models/shopping-cart";
import {ShoppingCartService} from "../services/shopping-cart.service";

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {
  cart;
  totalItems;
  productIds;
  totalPrice;

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    await this.shoppingCartService.getCart()
      .then(response => {
        response.valueChanges().subscribe(cart => {
          if(cart) {
            this.cart = cart;

            this.totalItems = 0;
            this.totalPrice = 0;

            for (let productId in cart.items){
              this.totalItems += cart.items[productId].quantity;
              this.totalPrice += (cart.items[productId].quantity * cart.items[productId].product.price);
            }

            this.productIds = Object.keys(cart.items);
          }
        })
      });
  }
}
