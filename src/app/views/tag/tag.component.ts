import { Component, OnInit } from '@angular/core';

import { Tag } from '../../shared/models';
import { TagService } from '../../shared/services';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  public tags: Tag[] = [];

  public onTagSelected(tag: Tag) {
    console.log(`Clicked on tag ${tag.id}`);
  }

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.tagService.list().subscribe((tags: Tag[]) => this.tags = tags);
  }

}
