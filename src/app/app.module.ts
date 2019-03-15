import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KanbanColumnComponent } from './components/kanban-column/kanban-column.component';
import { KanbanCardComponent } from './components/card/kanban-card.component';
import { CreateCardComponent } from './components/create-card-modal/create-card-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    KanbanColumnComponent,
    KanbanCardComponent,
    CreateCardComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
