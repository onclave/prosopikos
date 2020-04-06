import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidWorldMapComponent } from './covid-world-map.component';

describe('CovidWorldMapComponent', () => {
  let component: CovidWorldMapComponent;
  let fixture: ComponentFixture<CovidWorldMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidWorldMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidWorldMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
