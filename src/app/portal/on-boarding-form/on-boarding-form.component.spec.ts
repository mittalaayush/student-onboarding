import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBoardingFormComponent } from './on-boarding-form.component';

describe('OnBoardingFormComponent', () => {
  let component: OnBoardingFormComponent;
  let fixture: ComponentFixture<OnBoardingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnBoardingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnBoardingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
