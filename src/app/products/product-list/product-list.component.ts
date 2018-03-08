import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {DataSource} from '@angular/cdk/collections';

import {MatTableDataSource, MatSnackBar, MatPaginator, MatSort} from '@angular/material';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

import { Product } from '../shared/product.model';

import { ProductService } from '../shared/product.service';

import { OptionList } from '../../options_lists/optionlist.model';

import { OptionListService } from '../../options_lists/optionlist.service';

import {FileUpload} from '../../helpers/file-upload';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';

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

    filesToUpload: Array<File> = []


    public displayedColumns = ['productId', 'productName', 'productType', 'price'];
    public exampleDatabase : ExampleDatabase | null;
    public dataSource: ExampleDataSource | null;
    //public dataSource = new MatTableDataSource(this.productData);
        
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    constructor(private route: ActivatedRoute,
        private productService: ProductService,
        private optionListService: OptionListService,
        private location: Location,
        public snackBar: MatSnackBar,
        private fileUpload: FileUpload)
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

            this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
            //this.dataSource = new MatTableDataSource(this.productData);
            
            this.snackBar.open('Hi There! This is products list page','Close', {duration: 3000});
        
            Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        });
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
                this.snackBar.open('Please enter product name','Close', {duration: 3000});

                return;
            }

            let price = this.product.price;

            if(price < 1)
            {
                console.log('Please insert Product Price');
                this.snackBar.open('Please enter the Product Price','Close', {duration: 3000});

                return;
            }

            if(this.product.id > 0)
            {
                this.productService.updateProduct(this.product).subscribe(result =>{
                   this.refreshProductsTable();
                   this.upload();
                   this.snackBar.open('Updated product successfully!','Close', {duration: 3000});

                });              
            }
            else
            {
                this.productService.addProductBySequelize(this.product).subscribe();
                this.refreshProductsTable();
                this.snackBar.open('Added new product successfully!','Close', {duration: 3000});

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

        // applyFilter(filterValue: string) {
        //     filterValue = filterValue.trim(); // Remove whitespace
        //     filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        //     //this.dataSource.filter = filterValue;
        //   }

    refreshProductsTable(): void{
        this.exampleDatabase = new ExampleDatabase(this.productService);
        this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
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

    previewImage(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files

        console.log(this.filesToUpload)
    //     let fileList: FileList = event.target.files

    //     console.log('file upload '+ fileList.length)

    // if(fileList.length > 0) {
    //     let file: File = fileList[0]
    //     let formData:FormData = new FormData()
    //     formData.append('uploadFile', file, file.name)
    //     let headers = new Headers()
    //     /** No need to include Content-Type in Angular 4 */
    //     // headers.append('Content-Type', 'multipart/form-data');
    //     // headers.append('Accept', 'application/json');
    //     // let options = new RequestOptions({ headers: headers });
    //     // this.http.post(`${this.apiEndPoint}`, formData, options)
    //     //     .map(res => res.json())
    //     //     .catch(error => Observable.throw(error))
    //     //     .subscribe(
    //     //         data => console.log('success'),
    //     //         error => console.log(error)
    //     //     )
    // }
    }

    upload(){
        const formData: any = new FormData()

        const files: Array<File> = this.filesToUpload

        console.log(files)

        for(let i = 0; i< files.length;i++)
        {
            formData.append("files", files[i], files[i]['name'])
        }

        console.log('form data variable : '+formData.toString())

        this.fileUpload.uploads(formData, this.product.id, 'product').subscribe(res => console.log(res))
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

  /**
   * Data source to provide what data should be rendered in the table. Note that the data source
   * can retrieve its data in any way. In this case, the data source is provided a reference
   * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
   * the underlying data. Instead, it only needs to take the data and send the table exactly what
   * should be rendered.
   */
//   export class ExampleDataSource extends DataSource<any> {
//     constructor(private _exampleDatabase: ExampleDatabase) {
//       super();
//     }
//     /** Connect function called by the table to retrieve one stream containing the data to render. */
//     connect(): Observable<Product[]> {
//       const displayDataChanges = [this._exampleDatabase.dataChange]

// return Observable.merge(...displayDataChanges).map(()=>{
    
//     const data = this._exampleDatabase.data.slice();
    
//     return data.slice();
// })

//     }
  
//     disconnect() {}
// }

export class ExampleDataSource extends DataSource<any> {
    _filterChange = new BehaviorSubject('');
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }
  
    filteredData: Product[] = [];
    renderedData: Product[] = [];
  
    constructor(private _exampleDatabase: ExampleDatabase,
                private _paginator: MatPaginator,
                private _sort: MatSort) {
      super();
      
      this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
    }
  
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Product[]> {
      // Listen for any changes in the base data, sorting, filtering, or pagination
      const displayDataChanges = [
        this._exampleDatabase.dataChange,
        this._sort.sortChange, 
        this._filterChange,
        this._paginator.page,
      ];
  
      return Observable.merge(...displayDataChanges).map(() => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((item: Product) => {
          let searchStr = (item.name + item.price).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) != -1;
        });
  
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
  
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      });
    }
  
    disconnect() {}
  
    /** Returns a sorted copy of the database data. */
    sortData(data: Product[]): Product[] {
      if (!this._sort.active || this._sort.direction == '') { return data; }
  
      return data.sort((a, b) => {
        let propertyA: number|string = '';
        let propertyB: number|string = '';
  
        switch (this._sort.active) {
          case 'productId': [propertyA, propertyB] = [a.id, b.id]; break;
          case 'productName': [propertyA, propertyB] = [a.name, b.name]; break;
          case 'productType': [propertyA, propertyB] = [a.type, b.type]; break;
          case 'price': [propertyA, propertyB] = [a.price, b.price]; break;
        }
  
        let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
        let valueB = isNaN(+propertyB) ? propertyB : +propertyB;
  
        return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
      });
    }
  }

  /**  Copyright 2017 Google Inc. All Rights Reserved.
      Use of this source code is governed by an MIT-style license that
      can be found in the LICENSE file at http://angular.io/license */