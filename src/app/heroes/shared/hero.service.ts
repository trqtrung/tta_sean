import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero.model';
//import { HEROES } from './heroes/mock-heroes';
import { MessageService } from '../../messages/message.service';

import 'rxjs/add/operator/map';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class HeroService{

    private heroesUrl = 'http://localhost:3000/api';//'api/heroes';

    private heroesArray: Array<Hero> = null;

    private testData;

    constructor(
        private http: HttpClient,
        private messageService: MessageService
        
    ){}

    //old code
    /*getHeroes(): Hero[] {
        return HEROES;
    }*/

    //use observale
    getHeroes(): Observable<Hero[]> {
        //this.messageService.add('HeroService: fetched heroes');
        
        //old code
        //return of(HEROES);

      // this.http.get('http://localhost:3000/api').subscribe(data => {
      // console.log('the result is: ')  
      // console.log(data['results']);
      //});
      
        //use api        
        console.log('api');
        
        return this.http.get<Hero[]>(this.heroesUrl+'/all')
        .map(res => (res as Hero[]))
        .pipe(
          tap(heroes => console.log(`fetched heroes`)),
          catchError(this.handleError('getHeroes', []))
        );       
    }

    getHero(id: number): Observable<Hero> {
        // Todo: send the message _after_ fetching the hero

        /* //old code
        this.heroName = HEROES.find(hero => hero.id === id).name;

        this.messageService.add(`HeroService: fetched hero id=${id}` + ' - Name: '+ this.heroName);
        return of(HEROES.find(hero => hero.id === id));*/

        //use api 
        const url = `${this.heroesUrl}/${id}`;


        return this.http.get<Hero>(url).map(res => (res as Hero))
        .pipe(
            tap(hero =>console.log(`fetched hero id=${id}`)),
            catchError(this.handleError<Hero>(`getHero id=${id}`))
        );
      }

      updateHero(hero: Hero): Observable<any>{

const url =  `${this.heroesUrl}/edit`;

          return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
            tap(_ => console.log(`updated hero id=${hero.id}`)),
            catchError(this.handleError<any>('updateHero'))
          );
      }

      addHero (hero:Hero): Observable<Hero>{
        const url = `${this.heroesUrl}/add`;

          return this.http.post<Hero>(url, hero, httpOptions).pipe(
            tap((hero: Hero) => console.log(`added hero w/ id=${hero.id}`)),
            catchError(this.handleError<Hero>('addHero'))
          );
      }

      deleteHero (hero:Hero | number): Observable<Hero>{
          const id = typeof hero === 'number' ? hero : hero.id;
          const url =  `${this.heroesUrl}/${id}`;

          return this.http.delete<Hero>(url, httpOptions).pipe(
            tap(_ => console.log(`delete hero id=${id}`)),
            catchError(this.handleError<Hero>('deleteHero'))
          );
      }

      searchHeroes(term: string): Observable<Hero[]> {
        if (!term.trim()) {
          // if not search term, return empty hero array.
          return of([]);
        }
        return this.http.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
          tap(_ => console.log(`found heroes matching "${term}"`)),
          catchError(this.handleError<Hero[]>('searchHeroes', []))
        );
      }

      /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

       /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
}