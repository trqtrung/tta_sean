import { Component, OnInit } from '@angular/core';
import { Hero } from '../heroes/shared/hero.model';
import { HeroService } from '../heroes/shared/hero.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.css' ]
  })

export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];
   
    public now: Date = new Date();
    constructor(private heroService: HeroService) { 
      setInterval(() =>{
        this.now = new Date();
      },1);

    }
   
    title: string;

    ngOnInit() {
      this.getHeroes();
      var date = new Date()
     this.title = 'Welcome to Tran Trung Anh website';
    }
   
    getHeroes(): void {
      this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes.slice(0, 4));
    }
  }