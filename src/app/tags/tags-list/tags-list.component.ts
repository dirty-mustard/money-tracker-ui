import { Component, OnInit } from '@angular/core';
import { Tag } from "../../shared/models";
import { TagsService } from "../../shared/services";

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.css']
})
export class TagsListComponent implements OnInit {

  public tags: Tag[] = [];
  public selectedTag: Tag;

  constructor(private tagService: TagsService) { }

  ngOnInit() {
    this.tagService.list().subscribe((tags: Tag[]) => this.tags = tags);
  }

}
