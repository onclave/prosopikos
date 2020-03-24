import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidRecoveredComponent } from './covid-recovered.component';

describe('CovidRecoveredComponent', () => {
  let component: CovidRecoveredComponent;
  let fixture: ComponentFixture<CovidRecoveredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidRecoveredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidRecoveredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
