import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MediaQueryService } from '../../shared-services/media-query.service';

@Component({
  selector: 'app-navigation-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation-btn.component.html',
  styleUrl: './navigation-btn.component.css'
})
export class NavigationBtnComponent {
  @Input() btnTitle: string = ''
   #mediaQueryService = inject(MediaQueryService)
              isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
              isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
              isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))
}
