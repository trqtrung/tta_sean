import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../shared/product.service';
import { ProductInterface } from '../product-list/product-list.component';

@Component({
    selector: 'app-product-type',
    templateUrl: './product-type.component.html',
    styleUrls: ['./product-type.component.css'],
    providers: [ProductService]
})

export class ProductTypeComponent implements OnInit{
    productType: ProductInterface;

    ngOnInit(){

    }
}

export interface ProductTypeInterface{
    id: number
    name: string;
    key: string;
}