import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuledetailComponent } from './moduledetail.component';

describe('ModuledetailComponent', () => {
  let component: ModuledetailComponent;
  let fixture: ComponentFixture<ModuledetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuledetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuledetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
