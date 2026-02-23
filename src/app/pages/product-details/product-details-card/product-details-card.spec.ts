import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsCardComponent } from './product-details-card';

describe('ProductDetailsCardComponent', () => {
  let component: ProductDetailsCardComponent;
  let fixture: ComponentFixture<ProductDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
