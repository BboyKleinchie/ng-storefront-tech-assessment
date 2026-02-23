import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationModalComponent } from './registration-modal';

describe('RegistrationModalComponent', () => {
  let component: RegistrationModalComponent;
  let fixture: ComponentFixture<RegistrationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
