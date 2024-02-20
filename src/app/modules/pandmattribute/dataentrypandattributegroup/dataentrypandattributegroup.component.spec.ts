import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataentrypandattributegroupComponent } from './dataentrypandattributegroup.component';

describe('DataentrypandattributegroupComponent', () => {
  let component: DataentrypandattributegroupComponent;
  let fixture: ComponentFixture<DataentrypandattributegroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataentrypandattributegroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataentrypandattributegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
