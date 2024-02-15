import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkcodeWiseReportComponent } from './workcode-wise-report.component';

describe('WorkcodeWiseReportComponent', () => {
  let component: WorkcodeWiseReportComponent;
  let fixture: ComponentFixture<WorkcodeWiseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkcodeWiseReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkcodeWiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
