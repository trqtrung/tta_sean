import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LayoutModule} from '@angular/cdk/layout';
import {FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';

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

import {AppRoutingModule} from './shared/app-routing.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; //material angular animations
//import { InMemoryDataService} from './in-memory-data.service';

import { MaterialModule} from './shared/material.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroSearchComponent,
    MessagesComponent,
    ProductListComponent,
    ProductTypeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LayoutModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [HeroService, MessageService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
