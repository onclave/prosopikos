import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidDeathComponent } from './covid-death.component';

describe('CovidDeathComponent', () => {
  let component: CovidDeathComponent;
  let fixture: ComponentFixture<CovidDeathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidDeathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidDeathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
