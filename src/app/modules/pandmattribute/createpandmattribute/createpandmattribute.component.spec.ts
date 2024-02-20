import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepandmattributeComponent } from './createpandmattribute.component';

describe('CreatepandmattributeComponent', () => {
  let component: CreatepandmattributeComponent;
  let fixture: ComponentFixture<CreatepandmattributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatepandmattributeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatepandmattributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
