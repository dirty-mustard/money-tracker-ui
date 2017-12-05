import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Tag } from '../../models';

import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'app-tag-dropdown-list',
  templateUrl: './app-tag-dropdown-list.component.html',
  styleUrls: ['./app-tag-dropdown-list.component.scss'],
})
export class AppTagDropdownListComponent implements OnInit {
  @Input() tags: Tag[];
  @Input() id: string;
  @Output() onSelectedTagsChanged = new EventEmitter<Tag[]>();

  public optionsModel: number[] = [];
  public myOptions: IMultiSelectOption[];

  // Text configuration
  myTexts: IMultiSelectTexts = {
    defaultTitle: 'Select tag(s)',
  };

  // Settings configuration
  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-light col-12',
    containerClasses: 'col-12',
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: true
  };

  ngOnInit() {
    this.myOptions = this.tags.map((tag: Tag) => {
      return { id: tag.id, name: tag.name };
    });
  }

  public onChange() {
    this.onSelectedTagsChanged.emit(
      this.tags.filter((tag: Tag) => this.optionsModel.includes(tag.id))
    );
  }

}
