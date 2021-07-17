import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartProductTemplateComponent } from './cart-product-template.component';

describe('CartProductTemplateComponent', () => {
  let component: CartProductTemplateComponent;
  let fixture: ComponentFixture<CartProductTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartProductTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartProductTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
