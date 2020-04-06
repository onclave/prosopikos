import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidIndiaMapComponent } from './covid-india-map.component';

describe('CovidIndiaMapComponent', () => {
  let component: CovidIndiaMapComponent;
  let fixture: ComponentFixture<CovidIndiaMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidIndiaMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidIndiaMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
