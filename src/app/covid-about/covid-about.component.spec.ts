import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidAboutComponent } from './covid-about.component';

describe('CovidAboutComponent', () => {
  let component: CovidAboutComponent;
  let fixture: ComponentFixture<CovidAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
