import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberPickerComponent } from './number-picker';

describe('NumberPickerComponent', () => {
  let component: NumberPickerComponent;
  let fixture: ComponentFixture<NumberPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberPickerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
