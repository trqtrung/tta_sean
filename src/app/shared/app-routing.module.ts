import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent} from '../heroes/heroes.component';
import { HeroDetailComponent }  from '../heroes/hero-detail/hero-detail.component';

import { DashboardComponent }   from '../dashboard/dashboard.component';

import { ProductListComponent} from '../products/product-list/product-list.component';

import {ProductTypeComponent} from '../products/product-type/product-type.component';

import {LoginComponent} from '../login/login.component';
import { from } from 'rxjs/observable/from';

import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate:[AuthGuard] },
    { path: 'heroes', component: HeroesComponent, canActivate:[AuthGuard] },
    { path: 'detail/:id', component: HeroDetailComponent, canActivate:[AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
    {path: 'products', component: ProductListComponent, canActivate:[AuthGuard]},
    {path: 'products/detail/:id', component: ProductListComponent, canActivate:[AuthGuard]},
    {path: 'product_type', component: ProductTypeComponent, canActivate:[AuthGuard]},
    {path: 'login', component: LoginComponent}
  ];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule{}