import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyCartCardComponent } from './empty-cart-card';

describe('EmptyCartCardComponent', () => {
  let component: EmptyCartCardComponent;
  let fixture: ComponentFixture<EmptyCartCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyCartCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyCartCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
