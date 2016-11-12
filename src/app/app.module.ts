import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent, routing, appRoutingProviders } from './';
import { HeaderComponent } from './header';
import { SidebarComponent } from './sidebar';
import { ContentComponent } from './content';
import { FooterComponent } from './footer';
import { ControlsComponent } from './controls';
import { HomeComponent } from './home';

import { FilterService } from './filters/shared';
import { FilterFormComponent } from "./filters/filters-form";
import { FilterComponent } from "./filters/filters";
import { FilterListComponent } from "./filters/filters-list";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    FooterComponent,
    ControlsComponent,
    HomeComponent,
    FilterComponent,
    FilterListComponent,
    FilterFormComponent,
  ],
  providers: [ appRoutingProviders, FilterService, FormBuilder ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
