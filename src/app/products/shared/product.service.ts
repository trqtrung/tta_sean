import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders } from '@angular/common/http';

import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

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

    addProduct (product:Product): Observable<Product>{
        const url = `${this.productUrl}/add`;
        console.log('add product called in product service');
          return this.http.post<Product>(url, product, httpOptions).pipe(
            tap((product: Product) => this.log(`added product w/ id=${product.id}`)),
            catchError(this.handleError<Product>('addProduct'))
          );
      }

        /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }  
}