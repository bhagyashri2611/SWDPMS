import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorProgressDuringMansoonComponent } from './major-progress-during-mansoon.component';

describe('MajorProgressDuringMansoonComponent', () => {
  let component: MajorProgressDuringMansoonComponent;
  let fixture: ComponentFixture<MajorProgressDuringMansoonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MajorProgressDuringMansoonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MajorProgressDuringMansoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
