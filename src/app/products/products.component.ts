import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { Router } from '@angular/router';
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
productArr = [
  { 'id': 'JP100363', 'price': 140, 'image': 'https://cdn.shopify.com/s/files/1/1276/5299/products/g_0111_480x.jpg?v=1568378285'},
  { 'id': 'JP245541', 'price': 241.50, 'image': 'https://cdn.shopify.com/s/files/1/1276/5299/products/1_8f19a067-4ebe-4c23-9bde-a65d0818e0f4_480x.jpg?v=1546410357'},
  { 'id': 'JP500450', 'price': 280.60, 'image': 'https://cdn.shopify.com/s/files/1/1276/5299/products/g_7932_480x.jpg?v=1549026759'},
  { 'id': 'JP320123', 'price': 100, 'image': 'https://cdn.shopify.com/s/files/1/1276/5299/products/1_c1ce6579-64f2-4d8a-90f1-c63c092d2d0f_480x.jpg?v=1515127601'},
  { 'id': 'JP895423', 'price': 120, 'image': 'https://cdn.shopify.com/s/files/1/1276/5299/products/j_3373_480x.jpg?v=1518507869'},
  { 'id': 'JP630963', 'price': 130, 'image': 'https://cdn.shopify.com/s/files/1/1276/5299/products/g_0721_480x.jpg?v=1560879668'},
  { 'id': 'JP103245', 'price': 320, 'image': 'https://cdn.shopify.com/s/files/1/1276/5299/products/1_d960b378-e687-454d-8df2-5d604f6247d8_480x.jpg?v=1515068483'},
  { 'id': 'JP342081', 'price': 195, 'image': 'https://cdn.shopify.com/s/files/1/1276/5299/products/m_5234_1_ff0c0247-a161-4cfe-84e6-ecc986338d6d_480x.jpg?v=1553777374'},
  { 'id': 'JP100363', 'price': 560, 'image': 'https://cdn.shopify.com/s/files/1/1276/5299/products/1_d8850c28-6323-4e1b-be86-566994ea63c7_480x.jpg?v=1547816422'},
  { 'id': 'JP129089', 'price': 380, 'image': 'https://cdn.shopify.com/s/files/1/1276/5299/products/1_7b26df29-d31e-4d4c-8e4b-3f0329193821_480x.jpg?v=1529643903'},
  { 'id': 'JP230909', 'price': 240, 'image': 'https://cdn.shopify.com/s/files/1/1276/5299/products/6_e789f398-9b2b-4ab6-80e5-4ea85627a540_480x.jpg?v=1515079379'},
  { 'id': 'JP245541', 'price': 165, 'image': 'https://cdn.shopify.com/s/files/1/1276/5299/products/1_eb74f337-dc7b-4b04-ba8f-2bb40437ce09_480x.JPG?v=1568795292'},
];
  items: [];
  default = new Array(6);

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
  
  constructor(private router: Router, private productService: ProductService) {
    this.dataSource.data = TREE_DATA;
    // this.productService.getAllProducts().subscribe(res => {
    //   this.products = res;
    // });

    // this.productService.getAllItems().subscribe(res => {
    //   this.items = res;
    // });
   }

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }
  ngOnInit() {
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