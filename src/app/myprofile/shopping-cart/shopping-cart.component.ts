import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/interfaces/Ilogin';
import { ItemModal } from 'src/app/modal/item-modal';
import { CartItem } from 'src/app/modal/cart-item-modal';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cartItems : CartItem[];
 user : User;
 quantity = [
  {value: '1', viewValue: '1'},
  {value: '2', viewValue: '2'},
  {value: '3', viewValue: '3'},
  {value: '4', viewValue: '4'}
];
  constructor(private cartService: CartService) { 
    this.cartService.getCarts(sessionStorage.getItem("userId")).subscribe(res=>{
      this.cartItems = res;
    });
  }

  ngOnInit() {
  }
  
}
