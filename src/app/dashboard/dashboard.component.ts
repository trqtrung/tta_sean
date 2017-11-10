import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.css' ]
  })

export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];
   
    constructor(private heroService: HeroService) { }
   
    title: string;

    ngOnInit() {
      this.getHeroes();

      this.title = 'Top heroes 4';
    }
   
    getHeroes(): void {
      this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes.slice(0, 4));
    }
  }