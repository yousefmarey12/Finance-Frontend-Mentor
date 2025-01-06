import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MediaQueryService } from '../../../shared-services/media-query.service';

@Component({
  selector: 'app-recurring-bill',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recurring-bill.component.html',
  styleUrl: './recurring-bill.component.css'
})
export class RecurringBillComponent {
  @Input() amount: string = '250.00' 
  @Input() title: string = 'Elevate Education' 
  @Input() day: string = '5th' 
  @Input() isPaid: boolean = true;
   #mediaQueryService = inject(MediaQueryService)
              isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
              isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
              isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))
}
