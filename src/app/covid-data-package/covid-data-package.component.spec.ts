import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidDataPackageComponent } from './covid-data-package.component';

describe('CovidDataPackageComponent', () => {
  let component: CovidDataPackageComponent;
  let fixture: ComponentFixture<CovidDataPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidDataPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidDataPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
