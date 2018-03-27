import {Component, Input, OnInit} from '@angular/core';
import {ShoppingCartService} from "../services/shopping-cart.service";

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {
  @Input('product') product;
  @Input('shopping-cart') shoppingCart;
  quantity;
  hideRemoveButton: boolean = true;

  constructor(private shoppingCardService: ShoppingCartService) {}

  ngOnInit() {
    this.quantity = this.getQuantity();
    if(this.quantity < 1) {
      this.shoppingCardService.removeZeroQuantity(this.product);
    }
  }

  addToCart() {
    this.shoppingCardService.addToCart(this.product);
  }

  removeFromCard() {
    this.shoppingCardService.removeFromCard(this.product);

    let quantityProduct = this.getQuantity();
    if(quantityProduct - 1 < 1) {
      this.hideRemoveButton = false;
    }
  }

  getQuantity() {
    if(!this.shoppingCart) return 0;

    let item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }

}
