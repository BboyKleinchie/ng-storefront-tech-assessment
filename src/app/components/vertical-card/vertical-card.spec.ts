import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalCardComponent } from './vertical-card';

describe('VerticalCardComponent', () => {
  let component: VerticalCardComponent;
  let fixture: ComponentFixture<VerticalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerticalCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerticalCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
