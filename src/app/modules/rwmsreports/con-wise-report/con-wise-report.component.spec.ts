import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConWiseReportComponent } from './con-wise-report.component';

describe('ConWiseReportComponent', () => {
  let component: ConWiseReportComponent;
  let fixture: ComponentFixture<ConWiseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConWiseReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConWiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
