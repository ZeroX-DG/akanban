import { Component, Output, EventEmitter } from '@angular/core';
import Card from 'src/app/models/card';

@Component({
  selector: 'create-card-modal',
  templateUrl: './create-card-modal.component.html',
  styleUrls: ['./create-card-modal.component.sass']
})
export class CreateCardComponent {
  @Output() finish: EventEmitter<Card>;
  cardTitle: string;
  cardDescription: string;

  constructor() {
    this.finish = new EventEmitter();
  }

  createCard() {
    if (!this.cardTitle || !this.cardDescription) {
      return;
    }
    const card = new Card();
    card.title = this.cardTitle;
    card.description = this.cardDescription;
    this.finish.emit(card);
  }
}
