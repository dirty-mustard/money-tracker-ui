import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppReportListComponent } from './app-report-list.component';

describe('AppReportListComponent', () => {
  let component: AppReportListComponent;
  let fixture: ComponentFixture<AppReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
