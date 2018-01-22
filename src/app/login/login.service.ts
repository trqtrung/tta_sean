import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders } from '@angular/common/http';

import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import {AppSettings} from '../shared/app-settings';

import { Login } from '../login/login.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class LoginService {
    private apiUrl = AppSettings.API_URL + 'users/';

    constructor(
        private http: HttpClient
        
    ){}

    login (l:Login): Observable<Login>{
        const url = `${this.apiUrl}/login`;
        console.log('login service');
          return this.http.post<any>(url, l, httpOptions).map(user => {
              if(user && user.token)
              {
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  console.log(`new token for user ${l.username} ${user.token}`)
              }
              return user;
          })
    //       .pipe(
    //         tap((res: Login) => console.log(`logged in ${res.username}`)),
    //         catchError(this.handleError<Login>('error here when login'))
    //   );
      }

      logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
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


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/