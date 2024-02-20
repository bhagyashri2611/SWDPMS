import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinorProgressPreMansoonComponent } from './minor-progress-pre-mansoon.component';

describe('MinorProgressPreMansoonComponent', () => {
  let component: MinorProgressPreMansoonComponent;
  let fixture: ComponentFixture<MinorProgressPreMansoonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinorProgressPreMansoonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinorProgressPreMansoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
