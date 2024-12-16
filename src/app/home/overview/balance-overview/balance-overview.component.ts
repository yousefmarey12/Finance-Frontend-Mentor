import { Component, inject, OnInit } from '@angular/core';
import { BalanceComponent } from '../balance/balance.component';
import { CommonModule } from '@angular/common';
import { MediaQueryService } from '../../../shared-services/media-query.service';
import { MediaQuery } from '../../../shared-interfaces/media-query.interface';
import { map } from 'rxjs';
@Component({
  selector: 'app-balance-overview',
  standalone: true,
  imports: [BalanceComponent, CommonModule],
  templateUrl: './balance-overview.component.html',
  styleUrl: './balance-overview.component.css'
})
export class BalanceOverviewComponent implements OnInit {
  #mediaService = inject(MediaQueryService)
  viewports: MediaQuery = {
    isDesktop: false,
    isMobile: false,
    isTablet: false
  }
  ngOnInit(): void {
    console.log("1 should run before")
    this.#mediaService.viewports.subscribe(viewports => {
      this.viewports.isDesktop = viewports.isDesktop
      this.viewports.isMobile = viewports.isMobile
      this.viewports.isTablet = viewports.isTablet
    })

  }
}
