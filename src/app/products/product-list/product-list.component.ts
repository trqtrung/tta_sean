import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {DataSource} from '@angular/cdk/collections';

import {MatTableDataSource} from '@angular/material';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

import { Product } from '../shared/product.model';

import { ProductService } from '../shared/product.service';

import { OptionList } from '../../options_lists/optionlist.model';

import { OptionListService } from '../../options_lists/optionlist.service';

//import { element } from 'protractor';


//import {MessageService} from '../messages/message.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    providers: [ProductService]
})
 

export class ProductListComponent implements OnInit{
    
    products: Product[];
    product = new Product;

    productData: Product[] = [];

    prodata: Observable<Product[]>;

    types: OptionList[];


    public displayedColumns = ['productId', 'productName', 'productType', 'price'];
    public exampleDatabase : ExampleDatabase | null;
    public dataSource: ExampleDataSource | null;
    //public dataSource = new MatTableDataSource(this.productData);
        
    constructor(private route: ActivatedRoute,
        private productService: ProductService,
        private optionListService: OptionListService,
        private location: Location)
        {
            this.optionListService.getByKey('product.type').subscribe(t => {
                this.types = t as OptionList[]
            });
        }
        
    
        ngOnInit(){

            //this.getProductsData();
            //this.getProducts();

            //this.productData = this.getProductsData();

            this.exampleDatabase = new ExampleDatabase(this.productService);

            this.dataSource = new ExampleDataSource(this.exampleDatabase);
            //this.dataSource = new MatTableDataSource(this.productData);
            
        }

        getProduct(): void{
            const id = +this.route.snapshot.paramMap.get('id');
            console.log(`get product by id ${id}`)
            this.productService.getProduct(id)
            .subscribe(product => this.product = product);
        }

        getProducts(): void {
            //old code
            //this.heroes = this.heroService.getHeroes();
    
            //use observable
            this.productService.getProducts()
            .subscribe(products => this.products = products);

            console.log('get products' +this.products);
        }

        getProductsData(): Product[] {
            //old code
            //this.heroes = this.heroService.getHeroes();
            //var data: Product[];
            //use observable
            this.productService.getProducts().subscribe(products => this.productData = products);

            console.log(this.productData);

            return this.productData;            
        }

        goBack(): void {
            this.location.back();
          }

        save(): void{
            console.log(`pressed save ${this.product}`);
            
            this.productService.addProduct(this.product).subscribe();
            
            this.clear();
        }

        save_sequlize(): void{
            console.log('save with sequelize');

            let name = this.product.name.trim();

            if(!name)
            {
                console.log('Product Name is blank');
                return;
            }

            let price = this.product.price;

            if(price < 1)
            {
                console.log('Please insert Product Price');
                return;
            }

            if(this.product.id > 0)
            {
                this.productService.updateProduct(this.product).subscribe(result =>{
                   this.refreshProductsTable();
                });              
            }
            else
            {
                this.productService.addProductBySequelize(this.product).subscribe();
                this.refreshProductsTable();
            }
        }

        selectProduct(row){
            console.log(row);
            this.product.id = row.id;
            this.product.name = row.name;

            var price = row.price;

            this.product.price = row.price;          
        }

        isValid(){
            return true;
        }
        

        
        clear(): void{
            this.product.name = '';
            this.product.price = 0;
            this.product.id = 0;
        }

        applyFilter(filterValue: string) {
            filterValue = filterValue.trim(); // Remove whitespace
            filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
            //this.dataSource.filter = filterValue;
          }

    refreshProductsTable(): void{
        this.exampleDatabase = new ExampleDatabase(this.productService);
        this.dataSource = new ExampleDataSource(this.exampleDatabase);
    }

    delete(): void{
        if(this.product.id > 0)
        {

        }
        else{
            
        }
    }

    getTypes(){
        return this.optionListService.getByKey('product.type').subscribe()
    }
}
  
  
//   /** An example database that the data source uses to retrieve data for the table. */
  export class ExampleDatabase {

    /** Stream that emits whenever the data has been modified. */
    public dataChange: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
    get data(): Product[] { return this.dataChange.value; }


constructor(private productService: ProductService)
    {
        productService.getProducts().subscribe(data => this.dataChange.next(data));
    }
  }

export interface ProductInterface{
    items: Product[];
    total_count: number;
}

//   export class ExampleHttpDao{
//       constructor(private productService: ProductService){}

//       getProducts(sort: string, order: string, page: number):Observable<ProductInterface>{
//           return this.productService.getProducts.subscribe(products => this.productData = products);
//       }
//   }
  
  /**
   * Data source to provide what data should be rendered in the table. Note that the data source
   * can retrieve its data in any way. In this case, the data source is provided a reference
   * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
   * the underlying data. Instead, it only needs to take the data and send the table exactly what
   * should be rendered.
   */
  export class ExampleDataSource extends DataSource<any> {
    constructor(private _exampleDatabase: ExampleDatabase) {
      super();
    }
  
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Product[]> {
      const displayDataChanges = [this._exampleDatabase.dataChange]

return Observable.merge(...displayDataChanges).map(()=>{
    
    const data = this._exampleDatabase.data.slice();
    
    return data.slice();
})

    }
  
    disconnect() {}
}

  /**  Copyright 2017 Google Inc. All Rights Reserved.
      Use of this source code is governed by an MIT-style license that
      can be found in the LICENSE file at http://angular.io/license */