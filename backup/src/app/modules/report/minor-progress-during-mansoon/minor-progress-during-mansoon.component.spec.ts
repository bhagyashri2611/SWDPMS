import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinorProgressDuringMansoonComponent } from './minor-progress-during-mansoon.component';

describe('MinorProgressDuringMansoonComponent', () => {
  let component: MinorProgressDuringMansoonComponent;
  let fixture: ComponentFixture<MinorProgressDuringMansoonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinorProgressDuringMansoonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinorProgressDuringMansoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
