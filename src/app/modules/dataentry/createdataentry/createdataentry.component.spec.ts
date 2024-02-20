import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedataentryComponent } from './createdataentry.component';

describe('CreatedataentryComponent', () => {
  let component: CreatedataentryComponent;
  let fixture: ComponentFixture<CreatedataentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedataentryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatedataentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
