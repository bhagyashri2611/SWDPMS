import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlitQualitityComponent } from './slit-qualitity.component';

describe('SlitQualitityComponent', () => {
  let component: SlitQualitityComponent;
  let fixture: ComponentFixture<SlitQualitityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlitQualitityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlitQualitityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
