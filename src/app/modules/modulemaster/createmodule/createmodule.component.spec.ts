import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatemoduleComponent } from './createmodule.component';

describe('CreatemoduleComponent', () => {
  let component: CreatemoduleComponent;
  let fixture: ComponentFixture<CreatemoduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatemoduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatemoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
