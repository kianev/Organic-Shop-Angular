import {Component, Input, OnDestroy} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnDestroy {
  @Input('category') category;
  categories;
  categorySubscription: Subscription;

  constructor( categoryService: CategoryService) {
    this.categorySubscription = categoryService.getAll().valueChanges()
      .subscribe(categories => this.categories = categories);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.categorySubscription.unsubscribe();
  }


}
