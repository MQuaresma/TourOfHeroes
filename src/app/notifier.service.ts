import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})

export class NotifierService {

    constructor(public notifier: MatSnackBar ) { }

    notify(message: string) {
        this.notifier.open(message, '', {duration: 1000} );
    }
}
