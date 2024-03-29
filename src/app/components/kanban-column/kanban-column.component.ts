import { Component, Input, Output, EventEmitter } from '@angular/core';
import Column from 'src/app/models/column';
import { IColumnChangeValue } from 'src/app/app.component';
import Card from 'src/app/models/card';
import * as _ from 'lodash';

@Component({
  selector: 'kanban-column',
  templateUrl: './kanban-column.component.html',
  styleUrls: ['./kanban-column.component.sass']
})
export class KanbanColumnComponent {
  @Input() column: Column;
  @Output() createCard: EventEmitter<Column>;
  @Output() updateCard: EventEmitter<Card>;
  @Output() removeCard: EventEmitter<any>;
  @Output() cardChangeColumn: EventEmitter<IColumnChangeValue>;
  @Output() removeColumn: EventEmitter<Column>;

  constructor() {
    this.createCard = new EventEmitter();
    this.updateCard = new EventEmitter();
    this.cardChangeColumn = new EventEmitter();
    this.removeColumn = new EventEmitter();
    this.removeCard = new EventEmitter();
  }

  addCard() {
    this.createCard.emit(this.column);
  }

  handleChangeColumn(value: IColumnChangeValue) {
    this.cardChangeColumn.emit(value);
  }

  handleRemoveCard(card: Card) {
    this.column.cards = this.column.cards.filter(
      fcard => !_.isEqual(card, fcard)
    );
    this.removeCard.emit();
  }

  handleUpdateCard(card: Card) {
    this.updateCard.emit(card);
  }

  handleRemoveColumn() {
    this.removeColumn.emit(this.column);
  }
}
