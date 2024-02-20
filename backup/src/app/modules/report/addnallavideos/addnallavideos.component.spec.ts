import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnallavideosComponent } from './addnallavideos.component';

describe('AddnallavideosComponent', () => {
  let component: AddnallavideosComponent;
  let fixture: ComponentFixture<AddnallavideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnallavideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnallavideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
