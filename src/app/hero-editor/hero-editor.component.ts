import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Hero } from '../models/Hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-editor',
  templateUrl: './hero-editor.component.html',
  styleUrls: ['./hero-editor.component.css']
})

export class HeroEditorComponent implements OnInit {
    constructor(public editorRef: MatDialogRef<HeroEditorComponent>, @Inject(MAT_DIALOG_DATA) public data: Hero,
                private heroSrvc: HeroService ) {}

    ngOnInit() {}

    saveHero(name: string): void {
        this.data.name = name;
        this.heroSrvc.updateHero(this.data);
        this.editorRef.close();
    }

    discardChanges(): void {
        this.editorRef.close();
    }
}
