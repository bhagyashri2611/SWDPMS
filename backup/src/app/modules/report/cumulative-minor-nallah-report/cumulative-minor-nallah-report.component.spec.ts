import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CumulativeMinorNallahReportComponent } from './cumulative-minor-nallah-report.component';

describe('CumulativeMinorNallahReportComponent', () => {
  let component: CumulativeMinorNallahReportComponent;
  let fixture: ComponentFixture<CumulativeMinorNallahReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CumulativeMinorNallahReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CumulativeMinorNallahReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
