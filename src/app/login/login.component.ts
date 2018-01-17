import {Component, OnInit} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { LoginService } from './login.service';
import { Login } from './login.model';
import { error } from 'selenium-webdriver';

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

    constructor(private router: Router, 
        private route: ActivatedRoute,
         public loginService: LoginService){

    }

    ngOnInit(){
        this.loginService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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

        this.loginService.login(this.login).subscribe(
            result => {
                if(result)
                {
                console.log("success");
                this.router.navigate([this.returnUrl]);
                }else{
                    console.log("error");
                }
                
    },
error => {
    this.loading = false;
})


    }
}