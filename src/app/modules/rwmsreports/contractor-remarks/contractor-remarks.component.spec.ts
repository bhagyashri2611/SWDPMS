import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorRemarksComponent } from './contractor-remarks.component';

describe('ContractorRemarksComponent', () => {
  let component: ContractorRemarksComponent;
  let fixture: ComponentFixture<ContractorRemarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractorRemarksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
