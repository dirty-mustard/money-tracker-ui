import { Component, OnInit, Input } from '@angular/core';
import { Tag } from "../../shared/models";

declare var randomColor : any;

@Component({
  selector: 'app-tags-form',
  templateUrl: './tags-form.component.html',
  styleUrls: ['./tags-form.component.css']
})
export class TagsFormComponent implements OnInit {

  @Input('editingMode') editingMode: boolean = false;
  @Input('tag') tag: Tag = new Tag();
  public randomColors: string[] = randomColor({ hue: 'random', luminosity: 'dark', count: 10 });

  constructor() { }

  ngOnInit() {
  }

  onUpdate() {
    // this.saveEvent.emit(this.filter);
  }

  onCreate() {
    // this.saveEvent.emit(this.filter);
  }

  deleteOnClick() {
    // this.deleteEvent.emit(this.filter);
  }

}
