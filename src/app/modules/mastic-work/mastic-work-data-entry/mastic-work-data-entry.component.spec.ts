import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasticWorkDataEntryComponent } from './mastic-work-data-entry.component';

describe('MasticWorkDataEntryComponent', () => {
  let component: MasticWorkDataEntryComponent;
  let fixture: ComponentFixture<MasticWorkDataEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasticWorkDataEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasticWorkDataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
