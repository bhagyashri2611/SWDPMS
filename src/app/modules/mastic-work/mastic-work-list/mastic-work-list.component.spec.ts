import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasticWorkListComponent } from './mastic-work-list.component';

describe('MasticWorkListComponent', () => {
  let component: MasticWorkListComponent;
  let fixture: ComponentFixture<MasticWorkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasticWorkListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasticWorkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
