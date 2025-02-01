import { Component, computed, inject, OnInit } from '@angular/core';
import { MiniCardComponent } from '../../../util-components/mini-card/mini-card.component';
import { MediaQueryService } from '../../../../shared-services/media-query.service';
import { MediaQuery } from '../../../../shared-interfaces/media-query.interface';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../util-components/header/header.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '../../../util-components/button/button.component';

@Component({
  selector: 'app-pots',
  standalone: true,
  imports: [ButtonComponent, MiniCardComponent, CommonModule, HeaderComponent],
  templateUrl: './pots.component.html',
  styleUrl: './pots.component.css'
})
export class PotsComponent  {
   #mediaQueryService = inject(MediaQueryService)
       isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
       isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
       isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))
}
