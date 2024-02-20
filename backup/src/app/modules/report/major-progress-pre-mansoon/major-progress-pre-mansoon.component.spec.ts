import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorProgressPreMansoonComponent } from './major-progress-pre-mansoon.component';

describe('MajorProgressPreMansoonComponent', () => {
  let component: MajorProgressPreMansoonComponent;
  let fixture: ComponentFixture<MajorProgressPreMansoonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MajorProgressPreMansoonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MajorProgressPreMansoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
