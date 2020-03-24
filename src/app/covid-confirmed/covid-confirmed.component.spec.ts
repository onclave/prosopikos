import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidConfirmedComponent } from './covid-confirmed.component';

describe('CovidConfirmedComponent', () => {
  let component: CovidConfirmedComponent;
  let fixture: ComponentFixture<CovidConfirmedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidConfirmedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
