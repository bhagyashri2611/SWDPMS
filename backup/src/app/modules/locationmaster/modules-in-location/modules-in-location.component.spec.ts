import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulesInLocationComponent } from './modules-in-location.component';

describe('ModulesInLocationComponent', () => {
  let component: ModulesInLocationComponent;
  let fixture: ComponentFixture<ModulesInLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModulesInLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModulesInLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
