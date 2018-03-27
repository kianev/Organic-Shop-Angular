import { Component, Input } from '@angular/core';
import { ShoppingCartService } from "../services/shopping-cart.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
 @Input('product') product;
 @Input('show-actions') showActions = true;
 @Input('shopping-cart') shoppingCart;

  constructor(private shoppingCardService: ShoppingCartService) {

  }

  addToCart() {
    this.shoppingCardService.addToCart(this.product);
  }

  removeFromCard() {
    this.shoppingCardService.removeFromCard(this.product);
  }

  getQuantity() {
    if(!this.shoppingCart) return 0;

    let item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }

}
