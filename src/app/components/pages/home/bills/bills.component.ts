import { Component, computed, effect, inject } from '@angular/core';
import { HeaderComponent } from '../../../util-components/header/header.component';
import { BillComponent } from './bill/bill.component';
import { MediaQuery } from '../../../../shared-interfaces/media-query.interface';
import { MediaQueryService } from '../../../../shared-services/media-query.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [HeaderComponent, BillComponent, CommonModule],
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.css'
})
export class BillsComponent {
  #mediaQueryService = inject(MediaQueryService)
          isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
          isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
          isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))
     
}
