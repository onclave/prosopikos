import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidHelpComponent } from './covid-help.component';

describe('CovidHelpComponent', () => {
  let component: CovidHelpComponent;
  let fixture: ComponentFixture<CovidHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
