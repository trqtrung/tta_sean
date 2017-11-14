import { Component, OnInit } from '@angular/core';

import { Product } from '../shared/product.model';
//import {HEROES} from './mock-heroes';
import { ProductService } from '../shared/product.service';

//import {MessageService} from '../messages/message.service';

@Component({
    selector: 'app-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit{
    
    //remove because using routing
    //selectedHero: Hero;

    products: Product[];

    constructor(private productService: ProductService)
        {}
        
    
        ngOnInit(){
            this.getProducts();
        }
        getProducts(): void {
            //old code
            //this.heroes = this.heroService.getHeroes();
    
            //use observable
            this.productService.getProducts()
            .subscribe(products => this.products = products);
        }
}