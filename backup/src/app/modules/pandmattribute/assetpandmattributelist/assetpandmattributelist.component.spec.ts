import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetpandmattributelistComponent } from './assetpandmattributelist.component';

describe('AssetpandmattributelistComponent', () => {
  let component: AssetpandmattributelistComponent;
  let fixture: ComponentFixture<AssetpandmattributelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetpandmattributelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetpandmattributelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
