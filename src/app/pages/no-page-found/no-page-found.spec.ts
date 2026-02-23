import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPageFoundPage } from './no-page-found';

describe('NoPageFoundPage', () => {
  let component: NoPageFoundPage;
  let fixture: ComponentFixture<NoPageFoundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoPageFoundPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoPageFoundPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
