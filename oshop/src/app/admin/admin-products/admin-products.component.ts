import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Subscription} from "rxjs/Subscription";
import {Product} from "../../models/product";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    /* productService.getAll().valueChanges()
       .subscribe(products => {
         this.products = products;
         console.log(products);
       });*/
    this.subscription = this.productService.getAll().snapshotChanges().map(actions => {
      return actions.map(action => ({key: action.key, ...action.payload.val()}))
    })
      .subscribe(products => this.filteredProducts = this.products = products);
  }

  ngOnInit() {
  }

  filter(query: string){
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
