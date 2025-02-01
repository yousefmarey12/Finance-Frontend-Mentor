import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconDropdownComponent } from './icon-dropdown.component';

describe('IconDropdownComponent', () => {
  let component: IconDropdownComponent;
  let fixture: ComponentFixture<IconDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
