import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFilterListComponent } from './app-filter-list.component';

describe('AppFilterListComponent', () => {
  let component: AppFilterListComponent;
  let fixture: ComponentFixture<AppFilterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFilterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFilterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
