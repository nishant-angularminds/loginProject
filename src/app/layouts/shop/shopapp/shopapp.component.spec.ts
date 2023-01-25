import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopappComponent } from './shopapp.component';

describe('ShopappComponent', () => {
  let component: ShopappComponent;
  let fixture: ComponentFixture<ShopappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
