import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ItemModal } from '../../modal/item-modal';
import { CartItem } from 'src/app/modal/cart-item-modal';
import { CartService } from 'src/app/services/cart.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

 
  slideVeg = {
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
    {
    breakpoint: 768,
    settings: {
    slidesToShow: 2
    }
    },
    {
    breakpoint: 600,
    settings: {
    slidesToShow: 1
    }
    }
    ]
  };
  slideFruit = {
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
    {
    breakpoint: 768,
    settings: {
    slidesToShow: 2
    }
    },
    {
    breakpoint: 600,
    settings: {
    slidesToShow: 1
    }
    }
    ]
  };
  slideProduct = {
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
    {
    breakpoint: 768,
    settings: {
    slidesToShow: 2
    }
    },
    {
    breakpoint: 600,
    settings: {
    slidesToShow: 1
    }
    }
    ]
  };
  bigSlider = {
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
    {
    breakpoint: 768,
    settings: {
    slidesToShow: 1
    }
    },
    {
    breakpoint: 600,
    settings: {
    slidesToShow: 1
    }
    },
    {
    breakpoint: 400,
    settings: {
    slidesToShow: 1
    }
    }
    ]
  };
  
  addSlide() {
    // this.slides.push({img: "http://placehold.it/350x150/777777"})
  }
  
  removeSlide() {
    // this.slides.length = this.slides.length - 1;
  }
  
  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  }


    


  images = [
    {
      "text": "Festive Deer",
      "image": "https://www.bigbasket.com/media/uploads/banner_images/2008005_banana-store_460.jpg"
    },

    {
      "text": "Festive Deer",
      "image": "https://www.bigbasket.com/media/uploads/banner_images/2008210_fresho-days_460_Bangalore.jpg"
    }

  ];
  productImages = [
    {
      "text": "Fresh Fruit",
      "image": "../../../assets/images/product-images/product1.jpg"
    },
    {
      "text": "Daily Vegetables",
      "image": "../../../assets/images/product-images/product2.jpg"
    },
    {
      "text": "Cut and Sprouts",
      "image": "../../../assets/images/product-images/product3.jpg"
    },

    {
      "text": "Exotic Corner",
      "image": "../../../assets/images/product-images/product4.jpg"
    }

  ];

  vegetableData = [] ;
  fruitDatas = [];

  items: ItemModal[];

  constructor(private homeService: HomeService, 
    sanitizer: DomSanitizer,
     private router: Router, 
     private productService: ProductService,
     private cartservice : CartService,
     private eventEmitterService: EventEmitterService ) {

  }

  ngOnInit() {

    this.productService.getdashboardvegetables().subscribe(res => {
      this.vegetableData = res;
      console.log("items veg", this.vegetableData);
    });

    this.productService.getdashboardfruits().subscribe(res => {
      this.fruitDatas = res;
      console.log("items", this.fruitDatas)
    });
  }
  productHome(id) {
    this.router.navigate(['product/' + id]);
  }
  addProductToCart(data){
    this.firstComponentFunction();
    let cartItem = new CartItem();
    cartItem.userId=sessionStorage.getItem("userId");
    cartItem.itemId=data.id;
    cartItem.itemName=data.itemName;
    cartItem.itemPrice=data.regularPrice-(data.regularPrice*data.price/100);
    cartItem.quantity=1;

    this.cartservice.addProductToCart(cartItem).subscribe(res=>{
      console.log(res);
      this.loadCartItems(cartItem.userId);
    });

  }

  loadCartItems(userId) {
    this.cartservice.getCarts(userId).subscribe(res => {
      // this.cartItems = res;
      for (var i = 0; i < res.length; i++) {
        var element = res[i];
        console.log(element.price);
        // how to add each price and get a total 
        // this.totalAmount +=  (element.totalPrice);

    }
    });
  }

  firstComponentFunction(){    
    this.eventEmitterService.onFirstComponentButtonClick();    
  }  
}
