import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders } from '@angular/common/http';

import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { OptionList } from './optionlist.model';

//import { MessageService } from '../../messages/message.service';

import {AppSettings} from '../shared/app-settings';

import 'rxjs/add/operator/map';

let currentUser = JSON.parse(localStorage.getItem('currentUser'));

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':`Bearer ${currentUser}`  })
  };

@Injectable()
export class OptionListService{
    private apiUrl = AppSettings.API_URL + 'optionslists/';
    
    constructor(
        private http: HttpClient
        
    ){}

    add (opt:OptionList): Observable<OptionList>{
        const url = `${this.apiUrl}`;
        console.log('add option list called in option list service');
          return this.http.post<OptionList>(url, opt ).pipe(
            tap((opt: OptionList) => console.log(`added option w/ id=${opt.name}`)),
            catchError(this.handleError<OptionList>('add option'))
          );
      }

      getByKey(key: string): Observable<OptionList[]>{
        console.log('get opt by key '+key);
        const url = `${this.apiUrl}key/${key}`;
        return this.http.get<OptionList[]>(url).map(res => (res as OptionList[]))
        .pipe(
          tap(retult =>console.log(`fetched options list`)),
          catchError(this.handleError<OptionList[]>(`get options list error`))
      );      
    }

    getProductTypes(): Observable<OptionList[]>{
      console.log('opt service - get product types')
      const url = `${this.apiUrl}key/product.type`;

      return this.http.get<OptionList[]>(url).map(res => (res as OptionList[]))
      .pipe(
        catchError(this.handleError<OptionList[]>(`error - get product types`))
      );
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