import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { Router,ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  applyFilter: boolean = false;
  viewMoreClicked: boolean =false;
  hideViewMoreBtn : boolean = true;
  carouselOptions = 
  {
    items: 1, 
    dots: false, 
    navigation: false, 
    loop:true,
    margin:10,
    autoplay:true,
    animateOut: 'fadeOut',
    autoHeight: true,
    autoHeightClass: 'owl-height',
    
}

  items: [];
  default = new Array(6);
  vegetableData:any;
  public id: string;
  lastWord:string;
  
  constructor(private router: Router, private productService: ProductService,private route: ActivatedRoute) {
    this.dataSource.data = TREE_DATA;
    // this.productService.getAllProducts().subscribe(res => {
    //   this.products = res;
    // });



    this.productService.getAllItems().subscribe(res => {
      this.vegetableData = res;
      // console.log("vegetableData"+this.vegetableData);
    });
   }

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }
  ngOnInit() {

    this.id = window.location.pathname;
    this.lastWord=this.id.split("/").pop();
    console.log("id"+this.lastWord);


  }
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  
productHome(id) {
  this.router.navigate(['product/'+id]);
}
preserveFilterName:string;
showFilter: boolean = false;
showOption(selectedOption: string){
  if(selectedOption == this.preserveFilterName){
    this.showFilter = false;
    this.preserveFilterName = null;
  }
  else{
    this.showFilter = true;
    this.preserveFilterName = selectedOption;
  }
}
viewMore(){
  this.viewMoreClicked = true;
  this.hideViewMoreBtn = false;;
}
}
/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Apple',
    children: [
      {name: 'Kashmiri Apple'},
      {name: 'Fuji Apple'},
      {name: 'Empire Apple'},
    ]
  }, {
    name: 'Banana',
    children: [
      {name: 'Shirt'},
      {name: 'Shoes'},
      {name: 'Jeans'},
    ]
  },{
    name: 'Mango',
    children: [
      {name: 'Shirt'},
      {name: 'Shoes'},
      {name: 'Jeans'},
    ]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

