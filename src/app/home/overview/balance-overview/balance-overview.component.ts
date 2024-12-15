import { Component, inject } from '@angular/core';
import { BalanceComponent } from '../balance/balance.component';
import { CommonModule } from '@angular/common';
import { MediaQueryService } from '../../../shared-services/media-query.service';

@Component({
  selector: 'app-balance-overview',
  standalone: true,
  imports: [BalanceComponent, CommonModule],
  templateUrl: './balance-overview.component.html',
  styleUrl: './balance-overview.component.css'
})
export class BalanceOverviewComponent {
  #mediaService = inject(MediaQueryService)


}
