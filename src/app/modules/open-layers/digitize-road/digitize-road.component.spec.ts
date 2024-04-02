import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitizeRoadComponent } from './digitize-road.component';

describe('DigitizeRoadComponent', () => {
  let component: DigitizeRoadComponent;
  let fixture: ComponentFixture<DigitizeRoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitizeRoadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitizeRoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
