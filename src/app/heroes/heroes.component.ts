import { Component, OnInit } from '@angular/core';

import { Hero } from './shared/hero.model';
//import {HEROES} from './mock-heroes';
import { HeroService } from './shared/hero.service';

import {MessageService} from '../messages/message.service';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit{
    
    //remove because using routing
    //selectedHero: Hero;

    heroes: Hero[];

    constructor(private heroService: HeroService,
    private messageService: MessageService) { 

    }

    ngOnInit(){
        this.getHeroes();
    }

    onSelect(hero: Hero):void{
        //this.selectedHero = hero;

        //this.messageService.add('Hero: '+hero.name+' selected');
    }

    getHeroes(): void {
        //old code
        //this.heroes = this.heroService.getHeroes();

        //use observable
        this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
    }

    add(name: string): void{
        name = name.trim();
        if(!name)
        {
            return;
        }

        this.heroService.addHero({ name } as Hero)
            .subscribe(hero => {
                this.heroes.push(hero);
            });
    }

    delete(hero: Hero): void{
        this.heroes = this.heroes.filter(h=>h !== hero);
        this.heroService.deleteHero(hero).subscribe();
    }
}