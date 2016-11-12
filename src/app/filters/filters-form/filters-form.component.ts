import { Component, OnInit, Input } from '@angular/core';
import { Filter, FilterService } from "../shared";
import { ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'mt-filter-form',
  templateUrl: 'filters-form.component.html',
  styleUrls: ['filters-form.component.css']
})
export class FilterFormComponent implements OnInit {

  private filter: Observable<Filter> = Observable.of<Filter>(new Filter());
  submitted: boolean = false;

  constructor(private filterService: FilterService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    console.log(id);
    // this.filter = this.filterService.get(id);

  }

  onSubmit() {
    this.submitted = true;
    // this.filterService.create();
  }

}
