import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidContributionComponent } from './covid-contribution.component';

describe('CovidContributionComponent', () => {
  let component: CovidContributionComponent;
  let fixture: ComponentFixture<CovidContributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidContributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
