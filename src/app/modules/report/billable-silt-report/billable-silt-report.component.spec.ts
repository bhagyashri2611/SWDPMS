import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillableSiltReportComponent } from './billable-silt-report.component';

describe('BillableSiltReportComponent', () => {
  let component: BillableSiltReportComponent;
  let fixture: ComponentFixture<BillableSiltReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillableSiltReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillableSiltReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
