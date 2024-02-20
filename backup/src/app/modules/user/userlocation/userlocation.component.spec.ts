import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlocationComponent } from './userlocation.component';

describe('UserlocationComponent', () => {
  let component: UserlocationComponent;
  let fixture: ComponentFixture<UserlocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserlocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserlocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
