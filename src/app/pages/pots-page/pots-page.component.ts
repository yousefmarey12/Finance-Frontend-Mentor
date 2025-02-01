import { Component, computed, inject, OnInit } from '@angular/core';
import { PotComponent } from '../../components/large/pot/pot.component';
import { PotService } from '../../shared-services/pot.service';
import { Pot } from '../../shared-interfaces/pot.interface';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { MediaQueryService } from '../../shared-services/media-query.service';
import { ButtonComponent } from '../../components/small/button/button.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ModalService } from '../../shared-services/modal.service';

@Component({
  selector: 'app-pots-page',
  standalone: true,
  imports: [ButtonComponent, PotComponent, CommonModule, RouterOutlet],
  templateUrl: './pots-page.component.html',
  styleUrl: './pots-page.component.css'
})
export class PotsPageComponent implements OnInit {
  #mediaQueryService = inject(MediaQueryService)
    router = inject(Router)
    route = inject(ActivatedRoute)
    isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
    isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
    isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))
    modalService = inject(ModalService)
    modalOn = this.modalService.modalOn
      constructor(private potsService: PotService) {}
      pots: Pot[] = []
      ngOnInit(): void {
          this.pots = this.potsService.getPotDetails()()
      }

      navigateTo() {
        this.router.navigate(['new'], {
          relativeTo: this.route
        })
      }
}
