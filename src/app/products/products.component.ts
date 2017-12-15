import { Component, OnInit } from '@angular/core';

import { Product } from './shared/product.model';

import { ProductService } from './shared/product.service';

import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

@Component({
    selector: 'app-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductsComponent implements OnInit{
    
products: Product[];

constructor(private productService: ProductService){

}

    ngOnInit() {       
        this.getProducts();
      }

      getProducts():void{
          this.productService.getProducts().subscribe(products => this.products = products);
      }
}