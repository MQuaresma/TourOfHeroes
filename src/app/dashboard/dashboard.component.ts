import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Hero } from '../models/Hero';
import { HeroService } from '../services/hero.service';
import { HeroEditorComponent } from '../hero-editor/hero-editor.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];
    menuName = 'Hero Dashboard';

    constructor(private heroService: HeroService, private editDialog: MatDialog) { }

    ngOnInit() {
        this.getHeroes();
    }

    getHeroes() {
        this.heroService.getHeroes()
            .subscribe(heroes => this.heroes = heroes.slice(1, 5));
    }

    editHero(hero: Hero) {
        const editRef = this.editDialog.open(HeroEditorComponent, {
            width: '250px',
            data: hero
        });
    }
}
