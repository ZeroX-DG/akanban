import { Component } from '@angular/core';
import Column from './models/column';
import Card from './models/card';
import * as _ from 'lodash';
import db from './lib/db';

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
  showUpdateModal: boolean;
  selectedColumn: Column;
  newColumnTitle: string;
  selectedCard: Card;

  constructor() {
    this.showCreateModal = false;
    this.columns = db.getBoard() || [];
    // default values
    if (this.columns.length === 0) {
      const columnNames: string[] = ['todos', 'work in progress', 'finished'];
      columnNames.map(name => {
        const column = new Column();
        column.title = name;
        column.cards = [];
        this.columns.push(column);
      });
    }
  }

  handleAddCard(card: Card) {
    const column = this.columns.find(
      col => col.title === this.selectedColumn.title
    );
    column.cards.push(card);
    this.selectedColumn = null;
    this.showCreateModal = false;
    db.setBoard(this.columns);
  }

  handleOpenAddCard(column: Column) {
    this.selectedColumn = column;
    this.showCreateModal = true;
  }

  handleCardChangeColumn(value: IColumnChangeValue) {
    const oldColumn = this.columns.find(col =>
      col.cards.some(card => _.isEqual(card, value.card))
    );
    const newColumn = this.columns.find(col => col.title === value.columnTitle);
    if (!newColumn) {
      return;
    }
    oldColumn.cards = oldColumn.cards.filter(
      card => !_.isEqual(card, value.card)
    );

    newColumn.cards.push(value.card);
    db.setBoard(this.columns);
  }

  handleCreateColumn() {
    if (this.columns.some(col => col.title === this.newColumnTitle)) {
      return;
    }
    const column = new Column();
    column.title = this.newColumnTitle;
    column.cards = [];
    this.columns.push(column);
    this.newColumnTitle = '';
    db.setBoard(this.columns);
  }

  handleUpdateCard(card: Card) {
    this.selectedCard = card;
    this.showUpdateModal = true;
  }

  handleFinishUpdateCard(card: Card) {
    this.selectedCard.title = card.title;
    this.selectedCard.description = card.description;
    this.selectedCard = null;
    this.showUpdateModal = false;
    db.setBoard(this.columns);
  }
}
