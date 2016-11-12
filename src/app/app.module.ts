import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TransactionsService } from './services/transactions.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header';
import { SidebarComponent } from './sidebar';
import { ContentComponent } from './content';
import { FooterComponent } from './footer';
import { ControlsComponent } from './controls';
import { TransactionsListComponent } from './transactions/list';
import { MtCurrencyPipe } from './shared/pipes/mt-currency.pipe';
import { MtDatePipe } from './shared/pipes/mt-date.pipe';
import { MtTextPipe } from './shared/pipes/mt-text.pipe';

@NgModule({
  providers: [
    TransactionsService
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    FooterComponent,
    ControlsComponent,
    TransactionsListComponent,
    MtCurrencyPipe,
    MtDatePipe,
    MtTextPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
