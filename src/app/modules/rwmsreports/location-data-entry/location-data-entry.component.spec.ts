import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDataEntryComponent } from './location-data-entry.component';

describe('LocationDataEntryComponent', () => {
  let component: LocationDataEntryComponent;
  let fixture: ComponentFixture<LocationDataEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationDataEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationDataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
