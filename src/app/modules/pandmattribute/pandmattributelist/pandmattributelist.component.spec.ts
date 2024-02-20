import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PandmattributelistComponent } from './pandmattributelist.component';

describe('PandmattributelistComponent', () => {
  let component: PandmattributelistComponent;
  let fixture: ComponentFixture<PandmattributelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PandmattributelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PandmattributelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
