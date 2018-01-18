import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {AppSettings} from '../shared/app-settings';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {
    private apiUrl = AppSettings.API_URL + 'users/';

    constructor(private http: Http) { }
 
    login(username: string, password: string) {
        return this.http.post(this.apiUrl+'login', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user.token));
                    console.log(JSON.stringify(user.token));
                }
 
                return user;
            });
    }
 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}