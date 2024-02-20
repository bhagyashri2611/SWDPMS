import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNallahLoadingVideosComponent } from './view-nallah-loading-videos.component';

describe('ViewNallahLoadingVideosComponent', () => {
  let component: ViewNallahLoadingVideosComponent;
  let fixture: ComponentFixture<ViewNallahLoadingVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNallahLoadingVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewNallahLoadingVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
