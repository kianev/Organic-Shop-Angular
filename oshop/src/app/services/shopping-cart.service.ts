import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from "angularfire2/database";
import { Product } from "../models/product";
import 'rxjs/add/operator/take';
import {ShoppingCart} from "../models/shopping-cart";
import {Router} from "@angular/router";

@Injectable()
export class ShoppingCartService {
  item;
  productKey;

  constructor(private db: AngularFireDatabase, private router: Router) {}

  async getCart(): Promise<AngularFireObject<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();

    let item$ = this.getItem(cartId, product.key);
    item$.valueChanges().take(1).subscribe(item => {
      if(item) {
        item$.update({ quantity: (item as any).quantity + 1});
      } else {
        item$.set({ product: product, quantity: 1 });
      }
    });
  }

  async removeFromCard(product: Product) {
    let cartId = await this.getOrCreateCartId();

    let item$ = this.getItem(cartId, product.key);
    item$.valueChanges().take(1).subscribe(item => {
      item$.update({ quantity: (item as any).quantity - 1});
    });
  }

  async removeZeroQuantity(product: Product) {
    let cartId = await this.getOrCreateCartId();
    this.getItem(cartId, product.key).remove();
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();

    this.db.object('/shopping-carts/' + cartId + '/items').remove();
    this.router.navigate(['/']);
  }

  private create() {
   return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + /items/ + productId);
  }

   private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
  }


}
