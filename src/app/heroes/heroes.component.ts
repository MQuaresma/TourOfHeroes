import { Component, OnInit } from '@angular/core';
import {Hero} from '../Hero';
import { HeroService } from '../hero.service';

// Decorator for component metadata
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes : Hero[];

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    //initialization logic
    this.getHeroes();
  }

  add(name: string): void{
    name = name.trim();
    if(!name) return;
    this.heroService.addHero({name} as Hero)
        .subscribe(hero => {
          this.heroes.push(hero);
        });
  }

  delete(hero : Hero): void{
    this.heroes = this.heroes.filter(h => h !== hero); // assumes that the server will delete the hard copy of the hero
    this.heroService.deleteHero(hero).subscribe(); // subscribe ensures that the delete request is sent to the server
  }
}
