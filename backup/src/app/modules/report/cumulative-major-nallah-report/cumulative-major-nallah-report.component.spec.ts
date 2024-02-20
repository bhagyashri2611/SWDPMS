import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CumulativeMajorNallahReportComponent } from './cumulative-major-nallah-report.component';

describe('CumulativeMajorNallahReportComponent', () => {
  let component: CumulativeMajorNallahReportComponent;
  let fixture: ComponentFixture<CumulativeMajorNallahReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CumulativeMajorNallahReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CumulativeMajorNallahReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
