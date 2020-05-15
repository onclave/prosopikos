import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidAnalysisFourComponent } from './covid-analysis-four.component';

describe('CovidAnalysisFourComponent', () => {
  let component: CovidAnalysisFourComponent;
  let fixture: ComponentFixture<CovidAnalysisFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidAnalysisFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidAnalysisFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
