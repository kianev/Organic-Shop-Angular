import {Component, OnDestroy, OnInit} from '@angular/core';
import { ProductService } from "../services/product.service";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute} from "@angular/router";
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy{
  products = [];
  filteredProducts = [];
  category;
  categories;
  productSubscription: Subscription;

  constructor(productService: ProductService, route: ActivatedRoute) {
    this.productSubscription = productService
      .getAll().valueChanges()
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

  ngOnDestroy(){
    this.productSubscription.unsubscribe();
  }
}
