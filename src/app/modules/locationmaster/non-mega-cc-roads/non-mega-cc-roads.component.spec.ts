import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonMegaCcRoadsComponent } from './non-mega-cc-roads.component';

describe('NonMegaCcRoadsComponent', () => {
  let component: NonMegaCcRoadsComponent;
  let fixture: ComponentFixture<NonMegaCcRoadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonMegaCcRoadsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonMegaCcRoadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
