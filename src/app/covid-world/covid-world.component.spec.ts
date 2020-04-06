import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidWorldComponent } from './covid-world.component';

describe('CovidWorldComponent', () => {
  let component: CovidWorldComponent;
  let fixture: ComponentFixture<CovidWorldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidWorldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidWorldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
