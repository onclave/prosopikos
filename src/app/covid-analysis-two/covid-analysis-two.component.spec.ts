import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidAnalysisTwoComponent } from './covid-analysis-two.component';

describe('CovidAnalysisTwoComponent', () => {
  let component: CovidAnalysisTwoComponent;
  let fixture: ComponentFixture<CovidAnalysisTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidAnalysisTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidAnalysisTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
