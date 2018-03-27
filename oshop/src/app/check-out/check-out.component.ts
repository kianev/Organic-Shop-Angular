import { Component } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {
  shipping = {};

  constructor() { }

  placeOrder() {
    console.log(this.shipping);
  }
}
