import { Injectable } from '@angular/core';
import { Observable, ObservableLike, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';

import { NotifierService } from './notifier.service';
import { Message } from './Message';

const httpOptions = {
  headers: new HttpHeaders({'ContentType': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})

export class MessageService {
    private msgsUrl = 'api/msgs';
    messages: Message[] = [];

    constructor(private notifier: NotifierService, private http: HttpClient) { }

    getMsgs(): Observable<Message[]> {
        return this.http.get<Message[]>(this.msgsUrl)
                        .pipe(
                            catchError(this.handleError('getMsgs', []))
                        );
    }

    add(message: Message) {
        this.http.post<Message>(this.msgsUrl, message, httpOptions);
        this.notifier.notify(message.content);
    }

    clearAll() {
        // FIX
        this.messages = [];
    }

    clearSelected(selectedMsgs: Message[]) {
        selectedMsgs.forEach(msg => {
            const url = `${this.msgsUrl}/${msg.id}`;
            return this.http.delete<Message>(url, httpOptions);
        });
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

            // Let the app keep running by returning an empty result
            return of(result as T);
        };
    }


}
