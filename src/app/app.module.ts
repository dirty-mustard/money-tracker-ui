import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './';
import { HeaderComponent } from './header';
import { SidebarComponent } from './sidebar';
import { ContentComponent } from './content';
import { ControlsComponent } from './controls';
import { FooterComponent } from './footer';

@NgModule({
  imports: [BrowserModule],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    ControlsComponent,
    FooterComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
