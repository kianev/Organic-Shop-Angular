import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../../services/category.service";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
 categories$;
 product = {};
 id;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
    this.categories$ = categoryService.getCategories().valueChanges();

    this.id =  this.route.snapshot.paramMap.get('id');
    if(this.id) this.productService.getProduct(this.id).valueChanges()
      .take(1)
      .subscribe(p => this.product = p);
  }

  ngOnInit() {
  }

  save(product) {
    if(this.id) this.productService.updateProduct(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if(confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

}
