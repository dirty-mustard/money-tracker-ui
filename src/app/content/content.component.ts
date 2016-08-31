import { Component, OnInit } from '@angular/core';

import { FiltersComponent } from "../filters/";

@Component({
  moduleId: module.id,
  selector: 'mt-content',
  directives: [ FiltersComponent ],
  templateUrl: 'content.component.html',
  styleUrls: ['content.component.css']
})
export class ContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
