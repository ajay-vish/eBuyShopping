import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductTemplateComponent } from './admin-product-template.component';

describe('AdminProductTemplateComponent', () => {
  let component: AdminProductTemplateComponent;
  let fixture: ComponentFixture<AdminProductTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
