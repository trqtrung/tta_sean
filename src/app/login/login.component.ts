import {Component, OnInit} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { MatSnackBar} from '@angular/material';
import { LoginService } from './login.service';
import { Login } from './login.model';
import { MessageService } from '../messages/message.service';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
    login: Login;
    model: {};
    loading = false;
    returnUrl: string;
    //isLoggedIn: Observable<boolean>;

    constructor(private router: Router, 
        private route: ActivatedRoute,
         public loginService: LoginService,
        public messageService: MessageService,
        private authenticationService: AuthenticationService,
        public snackBar: MatSnackBar){

    }

    ngOnInit(){
        
        console.log('logout user')
        
        //this.isLoggedIn = this.authenticationService.isLoggedIn;
        //console.log(this.isLoggedIn)
        // if(this.isLoggedIn)
        // {  
        //     this.snackBar.open('Logged out','Close', {duration: 3000});
        // }
        this.authenticationService.logout()

        
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        console.log('redirect to after login' + this.returnUrl)
        this.login = new Login;
        
    }

    heyLogin() {
        this.loading = true;

        if(this.login.username === '' || !this.login.password)
        {
            alert('please insert username and password')
            return
        }

        console.log('pressed login')

        //use login service to login
        // this.loginService.login(this.login).subscribe(
        //     result => {
        //         if(result)
        //         {
        //         console.log("success");
        //         this.router.navigate([this.returnUrl]);
        //         }else{
        //             console.log("error");
        //             this.messageService.add('Username or password incorrect.');
        //         }               
        //     },
        //     error => {
        //         this.loading = false;
        //         this.messageService.add('Username or password incorrect.');
        //     })

        //user login function from authentication service
        this.authenticationService.login(this.login)
            .subscribe(
                data => {
                    console.log(this.returnUrl)
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.messageService.add(error);
                    this.loading = false;
                });
    }
}