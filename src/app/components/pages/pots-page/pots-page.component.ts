import { Component, computed, inject, OnInit } from '@angular/core';
import { PotComponent } from './pot/pot.component';
import { PotService } from '../../../shared-services/pot.service';
import { Pot } from '../../../shared-interfaces/pot.interface';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { MediaQueryService } from '../../../shared-services/media-query.service';
import { ButtonComponent } from '../../util-components/button/button.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ModalService } from '../../../shared-services/modal.service';

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
       this.route.data.subscribe(({data}) => {
          this.pots = data
       })

       this.potsService.potsChanged.subscribe((pots) => {
        this.pots = pots
       })
      }
    


      navigateTo() {
        this.router.navigate(['new'], {
          relativeTo: this.route
        })
      }
}
