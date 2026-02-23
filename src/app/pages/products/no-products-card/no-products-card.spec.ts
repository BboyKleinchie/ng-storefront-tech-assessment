import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoProductsCardComponent } from './no-products-card';

describe('NoProductsCardComponent', () => {
  let component: NoProductsCardComponent;
  let fixture: ComponentFixture<NoProductsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoProductsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoProductsCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
