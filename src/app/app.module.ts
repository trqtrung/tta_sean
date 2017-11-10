import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import {HeroService} from './hero.service';
import { HeroesComponent} from './heroes/heroes.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import { HeroSearchComponent} from './hero-search/hero-search.component';

import {MessageService } from './message.service';
import {MessagesComponent} from './messages/messages.component';

import {AppRoutingModule} from './app-routing.module';

import { InMemoryDataService} from './in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroSearchComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
 
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  providers: [HeroService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
