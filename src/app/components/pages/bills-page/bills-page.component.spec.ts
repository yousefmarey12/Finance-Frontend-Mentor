import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsPageComponent } from './bills-page.component';

describe('BillsPageComponent', () => {
  let component: BillsPageComponent;
  let fixture: ComponentFixture<BillsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
