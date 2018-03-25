import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Product } from "../models/product";
import 'rxjs/add/operator/take';

@Injectable()
export class ShoppingCartService {
  item;
  productKey;
  constructor(private db: AngularFireDatabase) { }

  private create() {
   return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + /items/ + productId);
  }

   async getCart() {
     let cartId = await this.getOrCreateCartId();
     return this.db.object('/shopping-carts/' + cartId);
  }

   private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
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


}
