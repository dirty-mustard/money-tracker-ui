import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { TransactionsService } from './services/transactions.service';

import { AppComponent } from './';
import { HeaderComponent } from './header';
import { SidebarComponent } from './sidebar';
import { ContentComponent } from './content';
import { FooterComponent } from './footer';
import { ControlsComponent } from './controls';
import { TransactionsListComponent } from './transactions/list';

@NgModule({
  imports: [BrowserModule, HttpModule],
  providers: [TransactionsService],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    FooterComponent,
    ControlsComponent,
    TransactionsListComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
