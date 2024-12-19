import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { BillComponent } from '../../../components/bill/bill.component';
import { MediaQuery } from '../../../shared-interfaces/media-query.interface';
import { MediaQueryService } from '../../../shared-services/media-query.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [HeaderComponent, BillComponent, CommonModule],
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.css'
})
export class BillsComponent {
 #mediaService = inject(MediaQueryService)
  viewports: MediaQuery = {
    isDesktop: false,
    isMobile: false,
    isTablet: false
  }
  ngOnInit(): void {
  
    this.#mediaService.viewports.subscribe(viewports => {
      this.viewports.isDesktop = viewports.isDesktop
      this.viewports.isMobile = viewports.isMobile
      this.viewports.isTablet = viewports.isTablet
    })

  }
}
