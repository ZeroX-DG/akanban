import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import Card from 'src/app/models/card';
import { makeDragable, distance } from 'src/app/lib/drag-and-drop';
import { IColumnChangeValue } from 'src/app/app.component';

@Component({
  selector: 'kanban-card',
  templateUrl: './kanban-card.component.html',
  styleUrls: ['./kanban-card.component.sass']
})
export class KanbanCardComponent implements AfterViewInit {
  @Input() card: Card;
  @Output() columnChange: EventEmitter<IColumnChangeValue>;
  @Output() removeCard: EventEmitter<Card>;
  @Output() updateCard: EventEmitter<Card>;
  @ViewChild('cardEl', { read: ElementRef }) cardEl: ElementRef;
  columnToChange: string;

  constructor() {
    this.columnChange = new EventEmitter();
    this.removeCard = new EventEmitter();
    this.updateCard = new EventEmitter();
  }

  ngAfterViewInit() {
    makeDragable(this.cardEl.nativeElement, {
      onDrag: () => {
        const columns = document.getElementsByClassName('column');
        Array.from(columns).map((colEl: HTMLElement) => {
          const distanceBetweenCenter = distance(
            this.cardEl.nativeElement,
            colEl
          );
          if (distanceBetweenCenter <= 200) {
            colEl.style.border = '1px solid red';
            this.columnToChange = colEl.dataset.columnTitle;
          } else {
            colEl.style.border = '1px solid transparent';
          }
        });
      },
      onDrop: () => {
        this.columnChange.emit({
          card: this.card,
          columnTitle: this.columnToChange
        });
        const columns = document.getElementsByClassName('column');
        Array.from(columns).map((colEl: HTMLElement) => {
          colEl.style.border = '1px solid transparent';
        });
      }
    });
  }

  handleRemoveCard() {
    this.removeCard.emit(this.card);
  }

  handleUpdateCard() {
    this.updateCard.emit(this.card);
  }
}
