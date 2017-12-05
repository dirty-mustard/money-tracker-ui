import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFiltersDropdownListComponent } from './app-filters-dropdown-list.component';

describe('AppFiltersDropdownListComponent', () => {
  let component: AppFiltersDropdownListComponent;
  let fixture: ComponentFixture<AppFiltersDropdownListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFiltersDropdownListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFiltersDropdownListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
