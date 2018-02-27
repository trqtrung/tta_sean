import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {AppSettings} from '../shared/app-settings';
import 'rxjs/add/operator/map'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { Login } from '../login/login.model';
 
@Injectable()
export class AuthenticationService {
    private apiUrl = AppSettings.API_URL + 'users/';

    private loggedIn = new BehaviorSubject<boolean>(false);

    get isLoggedIn(){
        if(localStorage['currentUser'])
            this.loggedIn.next(true)
        else
            this.loggedIn.next(false)
            
        return this.loggedIn.asObservable();
    }

    constructor(private http: Http, private router: Router) { }
 
    login(login: Login) {
        return this.http.post(this.apiUrl+'login', { username: login.username, password: login.password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user.token));
                    console.log(JSON.stringify(user.token));
                    this.loggedIn.next(true)
                }
                
                return user;
            });
    }
 
    logout() {
        this.loggedIn.next(false);
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');

        this.router.navigate(['/login']);
    }
}