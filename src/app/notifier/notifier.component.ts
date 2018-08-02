import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-notifier',
    templateUrl: './notifier.component.html',
    styleUrls: ['./notifier.component.css']
})

export class NotifierComponent implements OnInit {
    constructor(public notifier: MatSnackBar ) { }

    notify(message: string) {
        this.notifier.open(message, '', {duration: 2000} );
    }

    ngOnInit() {
    }
}
