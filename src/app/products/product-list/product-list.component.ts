import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';

import {DataSource} from '@angular/cdk/collections';

import {MatTableDataSource} from '@angular/material';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

import { Product } from '../shared/product.model';
//import {HEROES} from './mock-heroes';
import { ProductService } from '../shared/product.service';


//import {MessageService} from '../messages/message.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    providers: [ProductService]
})

export class ProductListComponent implements OnInit{
    
    //remove because using routing
    //selectedHero: Hero;
    public displayedColumns = ['productId', 'productName', 'price'];
    public exampleDatabase : ExampleDatabase | null;
    public dataSource: ExampleDataSource | null;

    products: Product[];
    product = new Product;

    
    constructor(private productService: ProductService,
        private location: Location)
        {
            //productService.getProducts().subscribe(data => this.dataChange.next(data));

        }
        
    
        ngOnInit(){
            //this.title = 'Products';
            //this.getProducts();

            this.exampleDatabase = new ExampleDatabase(this.productService);

            this.dataSource = new ExampleDataSource(this.exampleDatabase);
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
            console.log(`pressed save ${this.product}`);

            this.productService.addProduct(this.product).subscribe();
            

            //this.exampleDatabase = new ExampleDatabase(this.productService);
            //this.dataSource = new ExampleDataSource(this.exampleDatabase);

            this.clear();
        }

        save_sequlize(): void{
            console.log('save with sequelize');

            this.productService.addProductBySequelize(this.product).subscribe();
        }

        selectRow(row){
            console.log(row)
        }
        
        clear(): void{
            this.product.name = '';
            this.product.price = 0;
        }
}
  
  /** Constants used to fill up our data base. */
//   const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
//     'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
//   const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
//     'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
//     'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];
  
//   export interface UserData {
//     id: string;
//     name: string;
//     price: string;
//   }
  
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