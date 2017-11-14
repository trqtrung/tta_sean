import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Product } from './product.model';

import { MessageService } from '../../messages/message.service';

import 'rxjs/add/operator/map';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class ProductService{
    private productUrl = 'http://localhost:3000/products';
    
    constructor(
        private http: HttpClient,
        private messageService: MessageService
        
    ){}

    getProducts(): Observable<Product[]>{
        console.log('get all products');

        return this.http.get<Product[]>(this.productUrl)
        .map(res => (res as Product[]));
        
    }
}