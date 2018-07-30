import { Injectable } from '@angular/core';
import { Hero } from './Hero';
import { heroes } from './in-memory-service-data.service';
import {Observable, ObservableLike, of} from 'rxjs';
import { MessageService } from './message.service';

@Injectable({    // Marks the class as part taking in the dependency injection system
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { } // service-in-service: inject service in another service

  getHeroes(): Observable<Hero[]>{
    // TODO: send message __after__ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero>{
    //TODO: send message _after_ fetching hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
}
