import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private userService: UserService) {

  }

  canActivate(): Observable<boolean> {
    return this.authService.appUser$
      .map(addUser => addUser.isAdmin);
  }
}
