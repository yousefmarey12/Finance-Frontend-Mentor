import { Component, computed, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IconDropdownComponent, navigationConfig } from '../../../util-components/icon-dropdown/icon-dropdown.component';
import { Pot } from '../../../../shared-interfaces/pot.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { MediaQueryService } from '../../../../shared-services/media-query.service';
import { PotService } from '../../../../shared-services/pot.service';
import { DisplayMoney } from '../../../../shared-pipes/display-number.pipe';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../util-components/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgressBarComponent } from '../../../util-components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-pot',
  standalone: true,
  imports: [IconDropdownComponent, DisplayMoney, CommonModule, ButtonComponent, ProgressBarComponent],
  templateUrl: './pot.component.html',
  styleUrl: './pot.component.css'
})
export class PotComponent implements OnInit {


  @Input() pot: Pot = {
    category: 'Testing',
    amount: '0',
    target: '3',
    theme: {
      title: "Green",
      code: "#277334"
    }
  }
  @Input() index!: string
  amountPercentage: string = '' 
  router = inject(Router)
  route = inject(ActivatedRoute)
  items: navigationConfig[] = []
  constructor(private potService: PotService) {}
 
#mediaQueryService = inject(MediaQueryService)
       isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
       isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
       isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))
  ngOnInit(): void {

    console.log("pot")
    console.log(this.pot)
    let fraction = (+this.pot.amount)/(+this.pot.target)
    this.amountPercentage = (fraction * 100).toFixed(2)
    this.items = [
      {
        title: 'Edit Pot',
        path: ('edit/' + this.index)
      },
      {
        title: 'Delete Pot',
        path: ('delete/' + this.index)
      }
    ]
  }
  navigateTo(isDeposit = true) {
     
        this.router.navigate([`${isDeposit ? 'deposit' : 'withdraw'}`, this.index], {
          relativeTo: this.route
        })
    
    
  }
}
