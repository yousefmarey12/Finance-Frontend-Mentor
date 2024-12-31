import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaQueryService } from '../../../shared-services/media-query.service';
import { MediaQuery } from '../../../shared-interfaces/media-query.interface';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { AccountCardComponent } from '../../medium/account-card/account-card.component';
@Component({
  selector: 'app-balance-overview',
  standalone: true,
  imports: [ CommonModule, AccountCardComponent],
  templateUrl: './balance-overview.component.html',
  styleUrl: './balance-overview.component.css'
})
export class BalanceOverviewComponent {
   #mediaQueryService = inject(MediaQueryService)
      isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
      isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
      isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))
}
