import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CumulativehighwayreportComponent } from './cumulativehighwayreport.component';

describe('CumulativehighwayreportComponent', () => {
  let component: CumulativehighwayreportComponent;
  let fixture: ComponentFixture<CumulativehighwayreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CumulativehighwayreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CumulativehighwayreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
