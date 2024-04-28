import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasticRoadListComponent } from './mastic-road-list.component';

describe('MasticRoadListComponent', () => {
  let component: MasticRoadListComponent;
  let fixture: ComponentFixture<MasticRoadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasticRoadListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasticRoadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
