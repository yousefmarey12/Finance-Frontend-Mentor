import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceOverviewComponent } from './balance-overview.component';

describe('BalanceOverviewComponent', () => {
  let component: BalanceOverviewComponent;
  let fixture: ComponentFixture<BalanceOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
