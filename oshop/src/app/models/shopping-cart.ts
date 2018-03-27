import {ShoppingCartItem} from "./shopping-cart-item";
import {Product} from "./product";

export class ShoppingCart {
  items:  ShoppingCartItem[] = [];

  constructor (public itemsMap: { [productID: string]: ShoppingCartItem}) {
  }

  getQuantityFromCart(product: Product) {
    let item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }

  get productIds() {
    return Object.keys(this.items);
  }

}
