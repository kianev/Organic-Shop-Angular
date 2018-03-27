import {Component, OnInit} from '@angular/core';
import { AuthService } from "../services/auth.service";
import { AppUser } from "../models/app-user";
import { ShoppingCartService } from "../services/shopping-cart.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  itemsCount;

  constructor(public authService: AuthService, private shoppingCartService: ShoppingCartService) {}

  async ngOnInit(){
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);

    let cart$ = await this.shoppingCartService.getCart();
     cart$.valueChanges()
       .subscribe(cart => {
         this.itemsCount = 0;
         if(cart) {
           for (let productId in cart.items){
             this.itemsCount += cart.items[productId].quantity;
           }
         }
       });

  }

  logout() {
    this.authService.logout();
  }

}
