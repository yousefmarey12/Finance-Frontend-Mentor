import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTabletComponent } from './transaction-tablet.component';

describe('TransactionTabletComponent', () => {
  let component: TransactionTabletComponent;
  let fixture: ComponentFixture<TransactionTabletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionTabletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionTabletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
