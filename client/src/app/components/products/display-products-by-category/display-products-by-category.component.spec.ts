import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayProductsByCategoryComponent } from './display-products-by-category.component';

describe('DisplayProductsByCategoryComponent', () => {
  let component: DisplayProductsByCategoryComponent;
  let fixture: ComponentFixture<DisplayProductsByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayProductsByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayProductsByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
