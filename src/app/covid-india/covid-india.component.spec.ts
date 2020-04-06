import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidIndiaComponent } from './covid-india.component';

describe('CovidIndiaComponent', () => {
  let component: CovidIndiaComponent;
  let fixture: ComponentFixture<CovidIndiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidIndiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidIndiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
