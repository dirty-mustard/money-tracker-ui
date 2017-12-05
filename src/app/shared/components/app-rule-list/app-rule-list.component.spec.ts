import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRuleListComponent } from './app-rule-list.component';

describe('AppRuleListComponent', () => {
  let component: AppRuleListComponent;
  let fixture: ComponentFixture<AppRuleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppRuleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRuleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
