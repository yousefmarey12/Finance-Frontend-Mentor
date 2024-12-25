import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationBtnComponent } from './pagination-btn.component';

describe('PaginationBtnComponent', () => {
  let component: PaginationBtnComponent;
  let fixture: ComponentFixture<PaginationBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
