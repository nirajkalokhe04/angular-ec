import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { ItemModal } from '../modal/item-modal';
import { CartItem } from '../modal/cart-item-modal';
import { Order } from '../modal/order-modal';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
   
  })
};
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartitems : ItemModal[];
  api = "http://localhost:3000";
  baseURL = environment.baseURL;
  constructor(private httpClient: HttpClient) { }
  getCarts(userId : string): Observable<any> {
    // return this.httpClient.get(`${this.baseURL}/cart$userId=402881f273bd6f2e0173bd7332d70001);
    return this.httpClient.get<any[]>(`${this.baseURL}cartItems/${userId}`);
  }

  addProductToCart(product: CartItem): Observable<any> {
    return this.httpClient.post<number>(`${this.baseURL}addCartItem/`,product,httpOptions);
  }

  removeCartItem(itemId: string,userId:string): Observable<any> {
    return this.httpClient.post<number>(`${this.baseURL}deletecartItem/${itemId}/${userId}`,httpOptions);
  }

  placeorder(order: Order): Observable<any> {
    return this.httpClient.post<String>(`${this.baseURL}placeOrder/`,order,httpOptions);
  }
  /* cartItems : CartItem[];
  cartTotal = 0;
  cartDiscount = 0;
  cartPayable = 0;

  addProductToCart(product: ItemModal) {
    let productExists = false

    for (let i in this.cartItems) {
      if (this.cartItems[i].itemDescription === product.id) {
        this.cartItems[i].itemqantity++
        productExists = true
        break;
      }
    }

    if (!productExists) {
      var cartitem =new  CartItem;

      cartitem.id               =   product.id;
      cartitem.itemName         =   product.itemName;
      cartitem.itemDescription  =   product.itemDescription;
      cartitem.regularPrice     =   product.regularPrice;
      cartitem.itemprice        =   (product.salePrice!=null && product.salePrice!=0)?product.salePrice :product.regularPrice;
      cartitem.itemqantity      =    1;
      this.cartItems.push(cartitem);
    }

    this.cartTotal = 0;
    this.cartPayable=0;
    this.cartItems.forEach(item => {
      this.cartTotal += (item.itemqantity * item.regularPrice)
      this.cartPayable += (item.itemqantity * item.itemprice)
    });
    this.cartDiscount=this.cartTotal-this.cartPayable;
  } */

}
