import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidAnalysisComponent } from './covid-analysis.component';

describe('CovidAnalysisComponent', () => {
  let component: CovidAnalysisComponent;
  let fixture: ComponentFixture<CovidAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
