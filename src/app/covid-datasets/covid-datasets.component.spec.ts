import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidDatasetsComponent } from './covid-datasets.component';

describe('CovidDatasetsComponent', () => {
  let component: CovidDatasetsComponent;
  let fixture: ComponentFixture<CovidDatasetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidDatasetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidDatasetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
