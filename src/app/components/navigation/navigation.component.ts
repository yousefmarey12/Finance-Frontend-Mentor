import { Component, computed, inject } from '@angular/core';
import { NavigationBtnComponent } from '../navigation-btn/navigation-btn.component';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { MediaQueryService } from '../../shared-services/media-query.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NavigationBtnComponent, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  isActive: boolean[] = [true, false, false, false, false]
  #mediaQueryService = inject(MediaQueryService)
            isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
            isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
            isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))
}
