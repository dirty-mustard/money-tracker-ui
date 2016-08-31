import { Component, AfterViewInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'mt-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    System.import('adminlte');
  }

}
