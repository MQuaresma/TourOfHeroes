import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { MessageService } from '../message.service';
import { Message } from '../Message';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

export class MessagesComponent implements OnInit {
    renderedColumns: string[] = ['id', 'content'];
    msgLog: MatTableDataSource<Message>;
    curSelection = new SelectionModel<Message>(true, []);

    constructor(public messageService: MessageService) { }

    ngOnInit() {
        this.msgLog = new MatTableDataSource<Message>(this.getMessages());
    }

    getMessages() {
        let msgs: Message[];
        this.messageService.getMsgs().subscribe(msg => msgs= msg);
        return msgs;
    }

    /* Checks whether all messages are selected */
    allSelected(){
        const nSelected = this.curSelection.selected.length;
        const nRows = this.msgLog.data.length;
        return nSelected === nRows;
    }

    /* Toggle all selections */
    toggleAll(){
        this.allSelected() ?
            this.curSelection.clear() :
            this.msgLog.data.forEach(row => this.curSelection.select(row));
    }
}
