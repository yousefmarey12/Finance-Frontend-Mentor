import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MediaQueryService } from '../../../shared-services/media-query.service';
import { HoverDirective } from '../../../shared-directives/hover.directive';


@Component({
  selector: 'app-navigation-btn',
  standalone: true,
  imports: [CommonModule, HoverDirective],
  templateUrl: './navigation-btn.component.html',
  styleUrl: './navigation-btn.component.css'
})
export class NavigationBtnComponent {
  @Input() btnTitle: string = ''
  @Input() isActive: boolean = false;
   #mediaQueryService = inject(MediaQueryService)
              isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
              isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
              isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))
}
