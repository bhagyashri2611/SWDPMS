import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneWiseReportComponent } from './zone-wise-report.component';

describe('ZoneWiseReportComponent', () => {
  let component: ZoneWiseReportComponent;
  let fixture: ComponentFixture<ZoneWiseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoneWiseReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZoneWiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
