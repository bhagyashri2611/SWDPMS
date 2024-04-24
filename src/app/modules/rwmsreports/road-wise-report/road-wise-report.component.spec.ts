import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadWiseReportComponent } from './road-wise-report.component';

describe('RoadWiseReportComponent', () => {
  let component: RoadWiseReportComponent;
  let fixture: ComponentFixture<RoadWiseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadWiseReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadWiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
