import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLineStringComponent } from './add-line-string.component';

describe('AddLineStringComponent', () => {
  let component: AddLineStringComponent;
  let fixture: ComponentFixture<AddLineStringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLineStringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLineStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
