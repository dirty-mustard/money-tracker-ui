import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log($('h1').text());
  }

}
