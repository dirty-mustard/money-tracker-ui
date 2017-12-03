import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tag } from '../../models';

@Component({
  selector: 'app-tag-list',
  templateUrl: './app-tag-list.component.html',
  styleUrls: ['./app-tag-list.component.scss']
})
export class AppTagListComponent {

  @Input() tags: Tag[] = [];
  @Output() tagSelected = new EventEmitter<Tag>();

  tagOnClick(tag: Tag) {
    this.tagSelected.emit(tag);
  }

}
