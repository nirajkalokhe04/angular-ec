import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ItemModal } from '../modal/item-modal';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
//   carouselOptions = 
//   {
//     items: 4, 
//     dots: false, 
//     center: true,
//     navigation: false, 
//     loop:true,
//     autoplay:false,
//     animateOut: 'fadeOut',
//     autoHeight: true,
//     autoHeightClass: 'owl-height',
    
// }

images    :   [];
items     :   ItemModal[];
showOffers  : Boolean   =   false;
offerData   :   [];
default = new Array(4);
item      :{
  name  : 'string',
  id    :   'string'
}

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private router: Router, private productService: ProductService) {
  
    this.productService.getAllItems().subscribe(res => {
      this.items = res;
    });

    this.productService.getAllProducts().subscribe(res => {
      this.images = res;
    });
    iconRegistry.addSvgIcon(
        'thumbs-up',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));
  }

  ngOnInit() {
    this.getoffers();
  }

  getoffers(){
    this.productService.getdashboardoffers().subscribe(res => {
      this.offerData = res;
      if(this.offerData!=null && this.offerData.length>0){
        this.showOffers=true;
      }
    });
  }
  

  productHome(id) {
    this.router.navigate(['product/'+id]);
    }

}
