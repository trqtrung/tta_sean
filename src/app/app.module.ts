import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LayoutModule} from '@angular/cdk/layout';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
//import { HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';

import { DashboardComponent }   from './dashboard/dashboard.component';

import {HeroService} from './heroes/shared/hero.service';
import { HeroesComponent} from './heroes/heroes.component';
import {HeroDetailComponent} from './heroes/hero-detail/hero-detail.component';
import { HeroSearchComponent} from './heroes/hero-search/hero-search.component';

import { ProductService} from './products/shared/product.service';
import { ProductListComponent} from './products/product-list/product-list.component';
import {ProductTypeComponent} from './products/product-type/product-type.component';

import {MessageService } from './messages/message.service';
import {MessagesComponent} from './messages/messages.component';

import { OptionListService } from './options_lists/optionlist.service';

import { LoginService } from './login/login.service';
import { LoginComponent } from './login/login.component';

import { AuthenticationService } from './services/authentication.service';

import {AppRoutingModule} from './shared/app-routing.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; //material angular animations
import { InMemoryDataService} from './in-memory-data.service';

import { MaterialModule} from './shared/material.module';

import { AuthGuard } from './guards/auth.guard';

import { HttpsRequestInterceptor} from './helpers/https-request-interceptor';
//import { CustomHttp } from './helpers/custom-http';
//import { JwtInterceptor } from './helpers/jwt.interceptor';

//import { from } from 'rxjs/observable/from';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroSearchComponent,
    MessagesComponent,
    ProductListComponent,
    ProductTypeComponent, 
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LayoutModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
     AngularFontAwesomeModule
  ],
  providers: [
    //CustomHttp,
    AuthGuard,
    HeroService,
     MessageService,
      ProductService,
       OptionListService,
        LoginService,
        AuthenticationService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpsRequestInterceptor,
          multi: true
        }
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
