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

  constructor(private homeService: HomeService, sanitizer: DomSanitizer, private router: Router, private productService: ProductService) {

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
}
