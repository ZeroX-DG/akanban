import { Component } from '@angular/core';
import Column from './models/column';
import Card from './models/card';
import * as _ from 'lodash';

export interface IColumnChangeValue {
  card: Card;
  columnTitle: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  columns: Column[];
  showCreateModal: boolean;
  selectedColumn: Column;

  constructor() {
    this.showCreateModal = false;
    this.columns = [];
    const columnNames: string[] = ['todos', 'work in progress', 'finished'];
    columnNames.map(name => {
      const column = new Column();
      column.title = name;
      column.cards = [];
      this.columns.push(column);
    });
  }

  handleAddCard(card: Card) {
    const column = this.columns.find(
      col => col.title === this.selectedColumn.title
    );
    column.cards.push(card);
    this.selectedColumn = null;
    this.showCreateModal = false;
  }

  handleOpenAddCard(column: Column) {
    this.selectedColumn = column;
    this.showCreateModal = true;
  }

  handleCardChangeColumn(value: IColumnChangeValue) {
    const oldColumn = this.columns.find(col =>
      col.cards.some(card => _.isEqual(card, value.card))
    );
    oldColumn.cards.splice(
      oldColumn.cards.findIndex(card => _.isEqual(card, value.card)),
      1
    );
    const newColumn = this.columns.find(col => col.title === value.columnTitle);
    newColumn.cards.push(value.card);
  }
}
