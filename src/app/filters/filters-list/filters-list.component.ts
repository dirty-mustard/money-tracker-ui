import { OnInit, Component, Input } from "@angular/core";
import { Filter } from "../../shared/model";

@Component({
  selector: 'mt-filter-list',
  templateUrl: 'filters-list.component.html',
  styleUrls: ['filters-list.component.css']
})
export class FilterListComponent {

  @Input('filters') filters: Filter[] = [];
  errorMessage: any = null;

}
