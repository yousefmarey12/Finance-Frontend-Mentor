import { Component, inject, OnInit } from '@angular/core';
import { TertiaryComponent } from '../../../components/buttons/tertiary/tertiary.component';
import { MiniCardComponent } from '../../../components/mini-card/mini-card.component';
import { MediaQueryService } from '../../../shared-services/media-query.service';
import { MediaQuery } from '../../../shared-interfaces/media-query.interface';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-pots',
  standalone: true,
  imports: [TertiaryComponent, MiniCardComponent, CommonModule, HeaderComponent],
  templateUrl: './pots.component.html',
  styleUrl: './pots.component.css'
})
export class PotsComponent implements OnInit {
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
