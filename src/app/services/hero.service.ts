import { Injectable } from '@angular/core';
import { Observable, ObservableLike, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';

import { Hero } from '../models/Hero';
import { Message } from '../models/Message';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({'ContentType': 'application/json'})
};

@Injectable({    // Marks the class as part taking in the dependency injection system
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes'; // Web API URL

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { } // service-in-service: inject service in another service

  /* GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      );
  }

  /* GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /* Log a HeroService message with the MessageService */
  private log(message: String) {
      const content = `HeroService: ${message}`;
      this.messageService.add( { content } as Message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable object
   */
    private handleError<T> (operation = 'operation', result?: T) {
      return(error: any): Observable<T> => {
        // TODO: send the error to remote logging infrastructure
        console.error(error); // Log to console instead

        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result
        return of(result as T);
      };
    }

    updateHero(hero: Hero): Observable<any> {
      return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
    }

    /*POST: add a new hero to the server */
    addHero(hero: Hero): Observable<Hero> {
      return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
        tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
    }

    deleteHero(hero: Hero | number): Observable<Hero> {
      const id = typeof hero === 'number' ? hero : hero.id;
      const url = `${this.heroesUrl}/${id}`;

      return this.http.delete<Hero>(url, httpOptions).pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
    }

    /* GET heroes via fuzzy search */
    searchHeroes(term: String): Observable<Hero[]> {
      if (!term.trim()) { // No search term
        return of([]);
      }
      return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
        tap(_ => this.log(`found heroes matching ${term}`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
    }
}
