import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   constructor(private userService: UserService, private authService: AuthService, private router: Router){
     this.authService.user$.subscribe(user => {
       if(user) {
         userService.save(user);

         let returnUrl = localStorage.getItem('returnUrl');
         if(returnUrl) {
           localStorage.removeItem('returnUrl');
           router.navigateByUrl(returnUrl);
         }
       }
     })
   }
}
