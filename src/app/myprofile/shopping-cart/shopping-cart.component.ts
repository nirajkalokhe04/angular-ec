import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/interfaces/Ilogin';
import { ItemModal } from 'src/app/modal/item-modal';
import { CartItem } from 'src/app/modal/cart-item-modal';
import { Order } from 'src/app/modal/order-modal';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
cartItems : CartItem[];
 user : User;
 cartTotal:number;
 cartDiscount:number;
 cartPayable:number=0.00;
 totalAmount  : number=0.00;
  itemAmount  : number=0.00;
  deliveryCharges:number=50.00;
 quantity = [
  {value: '1', viewValue: '1'},
  {value: '2', viewValue: '2'},
  {value: '3', viewValue: '3'},
  {value: '4', viewValue: '4'}
];
  constructor(private cartService: CartService) { 
    this.cartService.getCarts(sessionStorage.getItem("userId")).subscribe(res=>{
      this.cartItems = res;
      for (var i = 0; i < res.length; i++) {
        var element = res[i];
        console.log(element.price);
        // how to add each price and get a total 
        this.totalAmount += parseFloat(element.totalPrice);

    }
    });
  }

  ngOnInit() {
  }

  addCartQuantity(cartdetailsid, itemId,itemName,itemPrice,itemSize,userId){
    let cartitem = new CartItem();
    cartitem.cartDetailId=cartdetailsid;
    cartitem.itemId=itemId;
    cartitem.itemName=itemName;
    cartitem.itemPrice=itemPrice;
    cartitem.size=itemSize;
    cartitem.quantity=1;
    cartitem.userId=userId;
    this.cartService.addProductToCart(cartitem).subscribe(res=>{
      console.log(res);
      this.loadCartItems(cartitem.userId);
    });
}
minusitemquantity(itemId,cartDetailId,itemPrice,userId){

  let cartitem = new CartItem();
  cartitem.quantity=-1;
  cartitem.cartDetailId=cartDetailId;
  cartitem.itemId=itemId;
  cartitem.itemPrice=itemPrice;
  cartitem.userId=userId;

  this.cartService.addProductToCart(cartitem).subscribe(res=>{
    console.log(res);
    this.loadCartItems(cartitem.userId);
  });
}

loadCartItems(userId) {
  this.cartService.getCarts(userId).subscribe(res => {
    this.cartItems = res;
    for (var i = 0; i < res.length; i++) {
      var element = res[i];
      console.log(element.price);
      // how to add each price and get a total 
      this.totalAmount += parseFloat(element.totalPrice);
      
    }
    this.cartPayable=this.totalAmount+this.deliveryCharges;
  });
}

removeCartItem(itemid,userid){
  this.cartService.removeCartItem(itemid,userid).subscribe(res=>{
    alert("item removed");
  });
  this.loadCartItems(userid);
}
  

chekoutOrder(cartObj,orderaddress,deliveryslot){

  let order = new Order();
  var itemAmount =0.00;
  order.deliveryCharge=this.deliveryCharges;
  order.deliverySlot=(null!=deliveryslot && deliveryslot!=""?deliveryslot:"09.00 AM - 12.00 PM");
  order.itemAmount= itemAmount;
  order.orderAddress  =  orderaddress;
  order.orderAmount   = this.totalAmount;
  order.taxAmount     = 0.00;
  order.totalAmount   = this.cartPayable;
  order.userId        = cartObj[0].userId;
  order.items         = this.cartItems;

  this.cartService.placeorder(order).subscribe(res=>{
    alert("order placed. Order id :"+res);
  });

}
}
