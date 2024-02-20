import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedataentrypageComponent } from './generatedataentrypage.component';

describe('GeneratedataentrypageComponent', () => {
  let component: GeneratedataentrypageComponent;
  let fixture: ComponentFixture<GeneratedataentrypageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratedataentrypageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratedataentrypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
