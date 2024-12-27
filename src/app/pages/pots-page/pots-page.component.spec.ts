import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotsPageComponent } from './pots-page.component';

describe('PotsPageComponent', () => {
  let component: PotsPageComponent;
  let fixture: ComponentFixture<PotsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
