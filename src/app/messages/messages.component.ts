import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { MessageService } from '../message.service';
import { Message } from '../Message';

const msgMock: Message[] = [
    { id: 1, content: 'Hello' },
    { id: 2, content: 'Goodbye' }
];


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

export class MessagesComponent implements OnInit {
    msgLog = new MatTableDataSource<Message>(msgMock);
    msgs: Message[] = msgMock;
    renderedColumns: string[] = ['select', 'id', 'content'];
    curSelection = new SelectionModel<Message>(true, []);

    constructor(public messageService: MessageService) { }

    ngOnInit() {
        // this.getMessages();
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
