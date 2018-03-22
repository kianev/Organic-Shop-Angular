import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products;

  constructor(private productService: ProductService) {
    /* productService.getAll().valueChanges()
       .subscribe(products => {
         this.products = products;
         console.log(products);
       });*/
    this.productService.getAll().snapshotChanges().map(actions => {
      return actions.map(action => ({key: action.key, ...action.payload.val()}))
    })
      .subscribe(products => this.products = products);
  }

  ngOnInit() {
  }

}
