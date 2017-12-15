import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';

import { Product } from '../shared/product.model';
//import {HEROES} from './mock-heroes';
import { ProductService } from '../shared/product.service';

//import {MessageService} from '../messages/message.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit{
    
    //remove because using routing
    //selectedHero: Hero;

    products: Product[];
    product: Product;

    constructor(private productService: ProductService,
        private location: Location)
        {}
        
    
        ngOnInit(){
            //this.title = 'Products';
            this.getProducts();
        }
        getProducts(): void {
            //old code
            //this.heroes = this.heroService.getHeroes();
    
            //use observable
            this.productService.getProducts()
            .subscribe(products => this.products = products);
        }

        goBack(): void {
            this.location.back();
          }

        save(): void{
            console.log('create pressed');
            this.productService.addProduct(this.product).subscribe(() => this.goBack());
        }
}