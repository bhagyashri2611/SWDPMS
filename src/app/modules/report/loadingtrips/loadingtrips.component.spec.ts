import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingtripsComponent } from './loadingtrips.component';

describe('LoadingtripsComponent', () => {
  let component: LoadingtripsComponent;
  let fixture: ComponentFixture<LoadingtripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingtripsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingtripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
