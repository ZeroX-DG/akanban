import { Component, Input, Output, EventEmitter } from '@angular/core';
import Column from 'src/app/models/column';
import Card from 'src/app/models/card';

@Component({
  selector: 'kanban-column',
  templateUrl: './kanban-column.component.html',
  styleUrls: ['./kanban-column.component.sass']
})
export class KanbanColumnComponent {
  @Input() column: Column;
  @Output() createCard: EventEmitter<Column>;

  constructor() {
    this.createCard = new EventEmitter();
  }

  addCard() {
    this.createCard.emit(this.column);
  }
}
