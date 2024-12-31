import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringBillComponent } from './recurring-bill.component';

describe('RecurringBillComponent', () => {
  let component: RecurringBillComponent;
  let fixture: ComponentFixture<RecurringBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecurringBillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurringBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
