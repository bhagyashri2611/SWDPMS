import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasticRoadDataEntryComponent } from './mastic-road-data-entry.component';

describe('MasticRoadDataEntryComponent', () => {
  let component: MasticRoadDataEntryComponent;
  let fixture: ComponentFixture<MasticRoadDataEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasticRoadDataEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasticRoadDataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
