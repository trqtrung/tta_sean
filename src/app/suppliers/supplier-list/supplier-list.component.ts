import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {DataSource} from '@angular/cdk/collections';

import {MatTableDataSource, MatSnackBar, MatPaginator, MatSort} from '@angular/material';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

import { Supplier } from '../shared/supplier.model';

import { SupplierService } from '../shared/supplier.service';

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
    selector: 'app-supplier-list',
    templateUrl: './supplier-list.component.html',
    styleUrls: ['./supplier-list.component.css'],
    providers: [SupplierService]
})
 

export class SupplierListComponent implements OnInit{

    supplier = new Supplier;

    constructor(
        private supplierService: SupplierService,
        public snackBar: MatSnackBar,
        public location: Location){}
    ngOnInit(){
    }
    isValid(){
        return true;
    }
    save(): void{
        console.log(`pressed save ${this.supplier}`);
        
        this.supplierService.add(this.supplier).subscribe(res => {
            console.log(res)
            this.snackBar.open(`New supplier ${this.supplier.name} has been added successfully!`,'Close', {duration: 3000});
        
        });
        
        this.clear();
    }
    clear(): void{
        
        this.supplier = new Supplier
    }
    goBack(): void {
        this.location.back();
      }
}