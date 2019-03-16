import { Component, Input, Output, EventEmitter } from '@angular/core';
import Column from 'src/app/models/column';
import { IColumnChangeValue } from 'src/app/app.component';

@Component({
  selector: 'kanban-column',
  templateUrl: './kanban-column.component.html',
  styleUrls: ['./kanban-column.component.sass']
})
export class KanbanColumnComponent {
  @Input() column: Column;
  @Output() createCard: EventEmitter<Column>;
  @Output() cardChangeColumn: EventEmitter<IColumnChangeValue>;

  constructor() {
    this.createCard = new EventEmitter();
    this.cardChangeColumn = new EventEmitter();
  }

  addCard() {
    this.createCard.emit(this.column);
  }

  handleChangeColumn(value: IColumnChangeValue) {
    this.cardChangeColumn.emit(value);
  }
}
