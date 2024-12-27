import { Component, computed, inject, OnInit } from '@angular/core';
import { PrimaryComponent } from '../../components/small/buttons/primary/primary.component';
import { PotComponent } from '../../components/large/pot/pot.component';
import { PotService } from '../../shared-services/pot.service';
import { Pot } from '../../shared-interfaces/pot.interface';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { MediaQueryService } from '../../shared-services/media-query.service';

@Component({
  selector: 'app-pots-page',
  standalone: true,
  imports: [PrimaryComponent, PotComponent, CommonModule],
  templateUrl: './pots-page.component.html',
  styleUrl: './pots-page.component.css'
})
export class PotsPageComponent implements OnInit {
  #mediaQueryService = inject(MediaQueryService)
    isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
    isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
    isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))
      constructor(private potsService: PotService) {}
      pots: Pot[] = []
      ngOnInit(): void {
          this.pots = this.potsService.getPotDetails()()
      }
}
