import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent} from '../heroes/heroes.component';
import { HeroDetailComponent }  from '../heroes/hero-detail/hero-detail.component';

import { DashboardComponent }   from '../dashboard/dashboard.component';

import { ProductListComponent} from '../products/product-list/product-list.component';

import {ProductTypeComponent} from '../products/product-type/product-type.component';

import {LoginComponent} from '../login/login.component';
import { from } from 'rxjs/observable/from';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'heroes', component: HeroesComponent },
    { path: 'detail/:id', component: HeroDetailComponent },
    { path: 'dashboard', component: DashboardComponent },
    {path: 'products', component: ProductListComponent},
    {path: 'products/detail/:id', component: ProductListComponent},
    {path: 'product_type', component: ProductTypeComponent},
    {path: 'login', component: LoginComponent}
  ];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule{}