import { Component, computed, inject, Input } from '@angular/core';
import { IconDropdownComponent } from '../../small/icon-dropdown/icon-dropdown.component';
import { Pot } from '../../../shared-interfaces/pot.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { MediaQueryService } from '../../../shared-services/media-query.service';
import { PotService } from '../../../shared-services/pot.service';
import { DisplayMoney } from '../../../shared-pipes/display-number.pipe';
import { CommonModule } from '@angular/common';
import { TertiaryComponent } from '../../small/buttons/tertiary/tertiary.component';
import { SecondaryComponent } from '../../small/buttons/secondary/secondary.component';

@Component({
  selector: 'app-pot',
  standalone: true,
  imports: [IconDropdownComponent, DisplayMoney, CommonModule, SecondaryComponent],
  templateUrl: './pot.component.html',
  styleUrl: './pot.component.css'
})
export class PotComponent {
  @Input() pot!: Pot
  @Input() index!: string
  amountPercentage: string = '' 
  constructor(private potService: PotService) {}
#mediaQueryService = inject(MediaQueryService)
       isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
       isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
       isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))
  ngOnInit(): void {
    let fraction = (+this.pot.amount)/(+this.pot.target)
    this.amountPercentage = (fraction * 100).toFixed(2)
  }
}
