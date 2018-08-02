import { Injectable } from '@angular/core';
import { NotifierService } from './notifier.service';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  messages: string[] = [];

  constructor(private notifier: NotifierService) { }

  add(message: string){
    this.messages.push(message);
    this.notifier.notify(message);
  }

  clear(){
    this.messages = [];
  }

}
