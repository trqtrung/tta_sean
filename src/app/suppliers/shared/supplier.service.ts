import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders } from '@angular/common/http';

import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Supplier } from '../shared/supplier.model';

//import { MessageService } from '../../messages/message.service';

import {AppSettings} from '../../shared/app-settings';

import 'rxjs/add/operator/map';

let currentUser = JSON.parse(localStorage.getItem('currentUser'));

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':`Bearer ${currentUser}`  })
  };

@Injectable()
export class SupplierService{
    private apiUrl = AppSettings.API_URL + 'suppliers/';
    
    constructor(
        private http: HttpClient
        
    ){}

    add (sup:Supplier): Observable<Supplier>{
        const url = `${this.apiUrl}`;
        console.log('service - add new supplier');
          return this.http.post<Supplier>(url, sup ).pipe(
            tap((sup: Supplier) => console.log(`added sup w/ id=${sup.name}`)),
            catchError(this.handleError<Supplier>('error'))
          );
      }

      getByID(id: number): Observable<Supplier>{
        console.log('get supplier by id '+id);
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Supplier>(url).map(res => (res as Supplier))
        .pipe(
          tap(retult =>console.log(`get supplier by id success`)),
          catchError(this.handleError<Supplier>(`get supplier by id error`))
      );      
    }

    getAll(): Observable<Supplier[]>{
      console.log('sup service - get suppliers')
      const url = `${this.apiUrl}`;

      return this.http.get<Supplier[]>(url).map(res => (res as Supplier[]))
      .pipe(
        catchError(this.handleError<Supplier[]>(`error - get all suppiers`))
      );
    }

    updateSupplier(sup:Supplier):Observable<Supplier>{
        const url = this.apiUrl

        console.log('update supplier')

        return this.http.put<Supplier>(url, sup, httpOptions).pipe(
          tap((supplier: Supplier) => console.log(`updated supplier ${supplier.name}`)),
          catchError(this.handleError<Supplier>('error - update supplier'))
        )
      }

      private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
     
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
     
          // TODO: better job of transforming error for user consumption
          //this.log(`${operation} failed: ${error.message}`);
     
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }
}