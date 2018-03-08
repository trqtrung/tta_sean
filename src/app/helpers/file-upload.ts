import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders } from '@angular/common/http';

import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import {AppSettings} from '../shared/app-settings';

import 'rxjs/add/operator/map';

let currentUser = JSON.parse(localStorage.getItem('currentUser'));

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':`Bearer ${currentUser}`  })
  };

@Injectable()
export class FileUpload{
    private apiUrl = AppSettings.API_URL + 'files/';
    
    constructor(
        private http: HttpClient
        
    ){}

    // add (opt:OptionList): Observable<OptionList>{
    //     const url = `${this.apiUrl}`;
    //     console.log('add option list called in option list service');
    //       return this.http.post<OptionList>(url, opt ).pipe(
    //         tap((opt: OptionList) => console.log(`added option w/ id=${opt.name}`)),
    //         catchError(this.handleError<OptionList>('add option'))
    //       );
    //   }

    uploads(formData, recordId, app){
        const url = `${this.apiUrl}/upload/`
        console.log('upload multi service called')

        const files: Array<File> = formData
        //return this.http.post(url, formData).map(files => files.json()).subscribe(files => console.log('files',files))

        return this.http.post(url, formData).pipe(tap(result => console.log(`uploaded ${files}`)), catchError(this.handleError<FormData>(`error while uploading ${files}`)))
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