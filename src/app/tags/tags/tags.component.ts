import { Component, OnInit } from '@angular/core';
import { Tag } from "../../shared/models";
import { TagsService } from "../../shared/services";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  public tags: Tag[] = [];
  public selectedTag: Tag;

  constructor(private tagService: TagsService) { }

  ngOnInit() {
    this.tagService.list().subscribe((tags: Tag[]) => this.tags = tags);
  }

}
