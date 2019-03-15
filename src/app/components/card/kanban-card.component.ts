import { Component, Input } from '@angular/core';
import Card from 'src/app/models/card';

@Component({
  selector: 'kanban-card',
  templateUrl: './kanban-card.component.html',
  styleUrls: ['./kanban-card.component.sass']
})
export class KanbanCardComponent {
  @Input() card: Card;
}
