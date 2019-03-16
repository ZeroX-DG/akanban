import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import Card from 'src/app/models/card';

@Component({
  selector: 'update-card-modal',
  templateUrl: './update-card-modal.component.html',
  styleUrls: ['./update-card-modal.component.sass']
})
export class UpdateCardComponent implements OnInit {
  @Output() finish: EventEmitter<Card>;
  @Input() defaultCard: Card;
  cardTitle: string;
  cardDescription: string;

  constructor() {
    this.finish = new EventEmitter();
  }

  ngOnInit() {
    this.cardTitle = this.defaultCard.title;
    this.cardDescription = this.defaultCard.description;
  }

  updateCard() {
    const card = new Card();
    card.title = this.cardTitle;
    card.description = this.cardDescription;
    this.finish.emit(card);
  }
}
