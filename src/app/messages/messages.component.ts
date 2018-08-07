import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { MessageService } from '../services/message.service';
import { Message } from '../models/Message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

export class MessagesComponent implements OnInit {
    msgLog: MatTableDataSource<Message>;
    msgs: Message[];
    renderedColumns: string[] = ['select', 'id', 'content'];
    curSelection = new SelectionModel<Message>(true, []);

    constructor(public messageService: MessageService) { }

    ngOnInit() {
        this.getMessages();
    }


    getMessages() {
        this.messageService.getMsgs().subscribe(
            (tMsgs) => { this.msgs = tMsgs; },
            (err) => { console.log(err); },
            () => { this.msgLog = new MatTableDataSource<Message>(this.msgs); }
        );
    }

    /* Checks whether all messages are selected */
    allSelected() {
        const nSelected = this.curSelection.selected.length;
        const nRows = this.msgLog.data.length;
        return nSelected === nRows;
    }

    /* Toggle all selections */
    toggleAll() {
        this.allSelected() ?
            this.curSelection.clear() :
            this.msgLog.data.forEach(row => this.curSelection.select(row));
    }
}
