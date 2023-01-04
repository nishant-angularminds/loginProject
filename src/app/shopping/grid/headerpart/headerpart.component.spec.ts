import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderpartComponent } from './headerpart.component';

describe('HeaderpartComponent', () => {
  let component: HeaderpartComponent;
  let fixture: ComponentFixture<HeaderpartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderpartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderpartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
