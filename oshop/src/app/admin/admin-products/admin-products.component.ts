import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { Subscription } from "rxjs/Subscription";
import { Product } from "../../models/product";
import { DataTableResource } from "angular5-data-table";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {
    /* productService.getAll().valueChanges()
       .subscribe(products => {
         this.products = products;
         console.log(products);
       });*/
    this.subscription = this.productService.getAll().snapshotChanges().map(actions => {
      return actions.map(action => ({key: action.key, ...action.payload.val()}))
    })
      .subscribe(products => {
        this.products = products;
        this.initializeTable(products);
      });
  }

  ngOnInit() {
  }

  private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource<Product>(products);
    this.tableResource.query({offset: 0})
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  filter(query: string){
    let filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;

    this.initializeTable(filteredProducts);
  }

  reloadItems(params) {
    if(!this.tableResource) return;

    this.tableResource.query(params)
      .then(items => this.items = items);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
