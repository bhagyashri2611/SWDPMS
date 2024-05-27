import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaCcRoadsComponent } from './mega-cc-roads.component';

describe('MegaCcRoadsComponent', () => {
  let component: MegaCcRoadsComponent;
  let fixture: ComponentFixture<MegaCcRoadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MegaCcRoadsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MegaCcRoadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
