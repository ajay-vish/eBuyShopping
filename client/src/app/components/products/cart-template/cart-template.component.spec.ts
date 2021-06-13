import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartTemplateComponent } from './cart-template.component';

describe('CartTemplateComponent', () => {
  let component: CartTemplateComponent;
  let fixture: ComponentFixture<CartTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
