import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpperHomeComponent } from './upper-home.component';

describe('UpperHomeComponent', () => {
  let component: UpperHomeComponent;
  let fixture: ComponentFixture<UpperHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpperHomeComponent]
    });
    fixture = TestBed.createComponent(UpperHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
