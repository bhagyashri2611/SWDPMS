import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataentrypandattributegrouplistComponent } from './dataentrypandattributegrouplist.component';

describe('DataentrypandattributegrouplistComponent', () => {
  let component: DataentrypandattributegrouplistComponent;
  let fixture: ComponentFixture<DataentrypandattributegrouplistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataentrypandattributegrouplistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataentrypandattributegrouplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
