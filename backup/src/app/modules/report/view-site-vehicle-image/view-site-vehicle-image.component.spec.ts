import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSiteVehicleImageComponent } from './view-site-vehicle-image.component';

describe('ViewSiteVehicleImageComponent', () => {
  let component: ViewSiteVehicleImageComponent;
  let fixture: ComponentFixture<ViewSiteVehicleImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSiteVehicleImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSiteVehicleImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
