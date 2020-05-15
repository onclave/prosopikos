import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidAnalysisThreeComponent } from './covid-analysis-three.component';

describe('CovidAnalysisThreeComponent', () => {
  let component: CovidAnalysisThreeComponent;
  let fixture: ComponentFixture<CovidAnalysisThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidAnalysisThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidAnalysisThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
