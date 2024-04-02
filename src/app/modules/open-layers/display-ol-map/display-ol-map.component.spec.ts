import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOlMapComponent } from './display-ol-map.component';

describe('DisplayOlMapComponent', () => {
  let component: DisplayOlMapComponent;
  let fixture: ComponentFixture<DisplayOlMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayOlMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayOlMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
