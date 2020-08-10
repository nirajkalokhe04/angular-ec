import { Component, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../../login/login.component';
import { LoginService } from '../../services/login.service';
import { User } from '../../interfaces/Ilogin';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { MdePopoverTrigger } from '@material-extended/mde';
import { ProductService } from '../../services/product.service';
import { ItemModal } from '../../modal/item-modal';
import { CommonService } from '../../services/common-service';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/modal/cart-item-modal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loadingEnable: boolean;
  sidenavEnable = false;
  user: User;
  items     :   ItemModal[];
  vegetableData:[];
  
  totalAmount : number=0.00;
  itemAmount  : number=0.00;
  deliveryCharges:number;
  @ViewChildren(MdePopoverTrigger) trigger: QueryList<MdePopoverTrigger>;

  @Output()
  sidenav = new EventEmitter();

  toggelSidenav() {
    this.sidenav.emit('toggel');
  }

  constructor(public dialog: MatDialog, private router: Router, 
    public loginService: LoginService,
      private commonservice:CommonService,
    private cartservice: CartService,
    public loadingService: LoadingService
    ,private productService: ProductService
    
    ) { 
      this.user={
        "userId":"402881f273d2c2610173d2c956f00001",
        "mobileNumber":"8888394005"
      }
      sessionStorage.setItem("userId",this.user.userId);
      if(this.user!=undefined&&this.user!=null){
        this.loadCartItems(this.user.userId);
      }
      
      this.productService.getAllItems().subscribe(res => {
        this.items = res;
        console.log("items header",this.items);
      });
    }


  ngOnInit() {
    this.loginService.loggedIn.subscribe(next => {
      this.user = next;
    });
    this.loadingService.progressEnable.subscribe(next => {
      this.loadingEnable = next;
    });

   
  }

  getcategories(){
    
    this.commonservice.getAllCategpries().subscribe(res => {
      this.vegetableData = res;
      // console.log("items", this.vegetableData)
    });
  }
  quantity = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'},
    {value: '4', viewValue: '4'}
  ];
  cartItems = new Array();

  enableSidenav() {
    this.sidenavEnable = !this.sidenavEnable;
  }
  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  logout() {
    this.user = null;

    this.loginService.loggedIn.next(this.user);
    sessionStorage.clear();
    this.router.navigate(['home']);
  }
  closeCartPopover() {
    if (this.user) {
      this.trigger.toArray()[3].togglePopover();
    } else {
      this.trigger.toArray()[2].togglePopover();
    }
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
      this.cartservice.addProductToCart(cartitem).subscribe(res=>{
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

    this.cartservice.addProductToCart(cartitem).subscribe(res=>{
      console.log(res);
      this.loadCartItems(cartitem.userId);
    });
  }

  loadCartItems(userId) {
    this.cartservice.getCarts(userId).subscribe(res => {
      this.cartItems = res;
      for (var i = 0; i < res.length; i++) {
        var element = res[i];
        console.log(element.price);
        // how to add each price and get a total 
        this.totalAmount += parseFloat(element.totalPrice);

    }
    });
  }

  firstFunction() {    
    alert( 'Hello ' + '\nWelcome to C# Corner \nFunction in First Component');    
  }
}
