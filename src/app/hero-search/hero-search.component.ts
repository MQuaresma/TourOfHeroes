import { Component, OnInit } from '@angular/core';

import { Observable, Subject} from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Hero } from '../Hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<String>();

  constructor(private heroService: HeroService){}

  // Push a search term into the observable stream
  search(term: string): void{
    this.searchTerms.next(term);
  }

  ngOnInit() {
    // Pipes the searchTerms observable to reduce the number of http requests made
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms between keystrokes
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      // only keep the most recent search term
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

}
