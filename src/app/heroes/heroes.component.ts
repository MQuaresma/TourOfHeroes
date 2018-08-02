import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material';

import { Hero } from '../Hero';
import { HeroService } from '../hero.service';
import { HeroEditorComponent } from '../hero-editor/hero-editor.component';

// Decorator for component metadata
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
    @ViewChild('heroTable') heroTable: MatTable<Hero>;
    heroes: Hero[];
    renderedColumns = ['id', 'name', 'edit'];

    constructor(private heroService: HeroService, public editDialog: MatDialog) { }

    ngOnInit() {
        // Initialization logic
        this.getHeroes();
    }

    getHeroes(): void {
        this.heroService.getHeroes()
            .subscribe(heroes => this.heroes = heroes);
    }


    add(name: string): void {
        name = name.trim();
        if (!name) {
            return;
        }
        this.heroService.addHero({name} as Hero).subscribe(
            (hero) => { this.heroes.push(hero); },
            (err) => { console.log(err); },
            () => { this.heroTable.renderRows(); }
        );
    }

    delete(hero: Hero): void {
        this.heroes = this.heroes.filter(h => h !== hero); // assumes that the server will delete the hard copy of the hero
        this.heroService.deleteHero(hero).subscribe(); // subscribe ensures that the delete request is sent to the server
    }

    editHero(hero: Hero) {
        const editRef = this.editDialog.open(HeroEditorComponent, {
            width: '250px',
            data: hero
        });
    }
}
