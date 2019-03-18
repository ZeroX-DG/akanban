import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KanbanColumnComponent } from './components/kanban-column/kanban-column.component';
import { KanbanCardComponent } from './components/kanban-card/kanban-card.component';
import { CreateCardComponent } from './components/create-card-modal/create-card-modal.component';
import { UpdateCardComponent } from './components/update-card-modal/update-card-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    KanbanColumnComponent,
    KanbanCardComponent,
    CreateCardComponent,
    UpdateCardComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
