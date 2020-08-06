import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/Ilogin';
import { LoginService } from 'src/app/services/login.service';
import { HomeService } from 'src/app/services/home.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ItemModal } from '../../modal/item-modal';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  carouselOptions = 
    {
      animateOut: 'bounceOutRight',
      animateIn: 'bounceInLeft',
      items: 1, 
      dots: false, 
      navigation: false, 
      loop:true,
      margin:0,
      autoplay:true,
    //  animateOut: 'fadeOut',
      autoHeight: true,
      autoHeightClass: 'owl-height',
      
  }
  carouselOptions1 = 
    {
      animateOut: 'bounceOutRight',
      animateIn: 'bounceInLeft',
      nav: true,
      navText:["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"],
      items: 4, 
      dots: true, 
      navigation: true, 
      loop:true,
      margin:0,
      autoplay:true,
    //  animateOut: 'fadeOut',
      autoHeight: true,
      autoHeightClass: 'owl-height',
      responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:3,
            nav:true
        },
        1000:{
            items:4,
            nav:true,
            loop:true
        }
    }
      
  }
  carouselOptions2 = 
    {
      animateOut: 'bounceOutRight',
      animateIn: 'bounceInLeft',
      nav: true,
      navText:["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"],
      items: 5, 
      dots: true, 
      navigation: true, 
      loop:true,
      margin:0,
      autoplay:true,
    //  animateOut: 'fadeOut',
      autoHeight: true,
      autoHeightClass: 'owl-height',
      responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:3,
            nav:true
        },
        1000:{
            items:5,
            nav:true,
            loop:true
        }
    }
      
  }
  carouselOptions3 = 
    {
      animateOut: 'bounceOutRight',
      animateIn: 'bounceInLeft',
      nav: true,
      navText:["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"],
      items: 5, 
      dots: true, 
      navigation: true, 
      loop:true,
      margin:0,
      autoplay:true,
    //  animateOut: 'fadeOut',
      autoHeight: true,
      autoHeightClass: 'owl-height',
      responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:3,
            nav:true
        },
        1000:{
            items:5,
            nav:true,
            loop:true
        }
    }
      
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
  vegetableData = [
  {
    "id": "402881f2738fa59001738fa7faaf0000",
    "itemName": "Corinder",
    "image": "https://demo.hasthemes.com/young-preview/young/assets/images/product/organic-pro-3.jpg",
    "itemDescription": null,
    "regularPrice": 15.0,
    "salePrice": 0.0,
    "isAvailable": null,
    "isTaxable": null,
    "subCategory": {
      "id": "402881f2738f9c6e01738f9e915a0001",
      "subcategotryName": "Leafy",
      "subcategoryDescription": "Leafy",
      "isActive": null,
      "category": {
        "id": "402881f2738f9c6e01738f9dc6730000",
        "categoryName": "Vegitable",
        "categoryDescription": "All Types of Vegitables",
        "isActive": true
      }
    }
  },
  {
    "id": "402881f2738fa59001738fa879d70001",
    "itemName": "Lemon",
    "image": "https://demo.hasthemes.com/young-preview/young/assets/images/product/organic-pro-6.jpg",
    "itemDescription": null,
    "regularPrice": 15.0,
    "salePrice": 0.0,
    "isAvailable": null,
    "isTaxable": null,
    "subCategory": {
      "id": "402881f2738f9c6e01738f9e915a0001",
      "subcategotryName": "Leafy",
      "subcategoryDescription": "Leafy",
      "isActive": null,
      "category": {
        "id": "402881f2738f9c6e01738f9dc6730000",
        "categoryName": "Vegitable",
        "categoryDescription": "All Types of Vegitables",
        "isActive": true
      }
    }
  },
  {
    "id": "402881f2738fa59001738fa93a400002",
    "itemName": "Garlic",
    "image": "https://demo.hasthemes.com/young-preview/young/assets/images/product/organic-pro-7.jpg",
    "itemDescription": null,
    "regularPrice": 25.0,
    "salePrice": 0.0,
    "isAvailable": null,
    "isTaxable": null,
    "subCategory": {
      "id": "402881f2738f9c6e01738f9f24680003",
      "subcategotryName": "Root",
      "subcategoryDescription": "Root",
      "isActive": null,
      "category": {
        "id": "402881f2738f9c6e01738f9dc6730000",
        "categoryName": "Vegitable",
        "categoryDescription": "All Types of Vegitables",
        "isActive": true
      }
    }
  },
  {
    "id": "402881f2738fa59001738fa93a400002",
    "itemName": "Garlic",
    "image": "https://demo.hasthemes.com/young-preview/young/assets/images/product/organic-pro-7.jpg",
    "itemDescription": null,
    "regularPrice": 25.0,
    "salePrice": 0.0,
    "isAvailable": null,
    "isTaxable": null,
    "subCategory": {
      "id": "402881f2738f9c6e01738f9f24680003",
      "subcategotryName": "Root",
      "subcategoryDescription": "Root",
      "isActive": null,
      "category": {
        "id": "402881f2738f9c6e01738f9dc6730000",
        "categoryName": "Vegitable",
        "categoryDescription": "All Types of Vegitables",
        "isActive": true
      }
    }
  },
  {
    "id": "402881f2738fa59001738fa971690003",
    "itemName": "Tomato",
    "image": "https://demo.hasthemes.com/young-preview/young/assets/images/product/organic-pro-8.jpg",
    "itemDescription": null,
    "regularPrice": 29.0,
    "salePrice": 0.0,
    "isAvailable": null,
    "isTaxable": null,
    "subCategory": {
      "id": "402881f2738f9c6e01738f9ef7bd0002",
      "subcategotryName": "Fruit",
      "subcategoryDescription": "Fruit",
      "isActive": null,
      "category": {
        "id": "402881f2738f9c6e01738f9dc6730000",
        "categoryName": "Vegitable",
        "categoryDescription": "All Types of Vegitables",
        "isActive": true
      }
    }
  },
   
  ];

  fruitDatas = [
    {
      "id": "402881f2738fa59001738fa7faaf0000",
      "itemName": "Apple",
      "image": "https://demo.hasthemes.com/young-preview/young/assets/images/product/organic-pro-4.jpg",
      "itemDescription": null,
      "regularPrice": 15.0,
      "salePrice": 0.0,
      "isAvailable": null,
      "isTaxable": null,
      "subCategory": {
        "id": "402881f2738f9c6e01738f9e915a0001",
        "subcategotryName": "Leafy",
        "subcategoryDescription": "Leafy",
        "isActive": null,
        "category": {
          "id": "402881f2738f9c6e01738f9dc6730000",
          "categoryName": "Vegitable",
          "categoryDescription": "All Types of Vegitables",
          "isActive": true
        }
      }
    },
  ];


  items     :   ItemModal[];

  constructor(private homeService: HomeService, sanitizer: DomSanitizer, private router: Router, private productService: ProductService) { 
    this.productService.getAllItems().subscribe(res => {
      this.items = res;
      console.log("items",this.items);
    });
  }

  ngOnInit() {
  }
  productHome(id) {
    this.router.navigate(['product/'+id]);
    }
}
