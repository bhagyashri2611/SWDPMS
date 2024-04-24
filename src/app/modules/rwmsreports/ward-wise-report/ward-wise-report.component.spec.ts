import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WardWiseReportComponent } from './ward-wise-report.component';

describe('WardWiseReportComponent', () => {
  let component: WardWiseReportComponent;
  let fixture: ComponentFixture<WardWiseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WardWiseReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WardWiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
