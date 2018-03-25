import {Component, OnDestroy, OnInit} from '@angular/core';
import { ProductService } from "../services/product.service";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import {ShoppingCartService} from "../services/shopping-cart.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy, OnInit{
  products = [];
  filteredProducts = [];
  category: string;
  cart: any;
  productSubscription: Subscription;
  cartSubscription: Subscription;

  constructor(productService: ProductService, route: ActivatedRoute, private shoppingCartService: ShoppingCartService) {
    this.productSubscription = productService
      .getAll().snapshotChanges()
      .map(actions => {
        return actions.map(action => ({key: action.key, ...action.payload.val()}))
      })
      .switchMap(products => {
        this.products = products;
        return route.queryParamMap
      })
      .subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      });
  }

  async ngOnInit() {
    this.cartSubscription = (await this.shoppingCartService.getCart()).valueChanges()
      .subscribe(cart => {
      this.cart = cart;
    });
  }

  ngOnDestroy(){
    this.productSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }
}
