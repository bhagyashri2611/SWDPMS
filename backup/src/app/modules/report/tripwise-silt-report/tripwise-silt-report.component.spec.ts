import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripwiseSiltReportComponent } from './tripwise-silt-report.component';

describe('TripwiseSiltReportComponent', () => {
  let component: TripwiseSiltReportComponent;
  let fixture: ComponentFixture<TripwiseSiltReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripwiseSiltReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripwiseSiltReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
