import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../../medium/header/header.component';
import { MiniCardComponent } from '../../small/mini-card/mini-card.component';
import { DoughnutChartComponent } from '../../small/doughnut-chart/doughnut-chart.component';
import { CommonModule } from '@angular/common';
import { MediaQuery } from '../../../shared-interfaces/media-query.interface';
import { MediaQueryService } from '../../../shared-services/media-query.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [HeaderComponent, MiniCardComponent, DoughnutChartComponent, CommonModule],
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.css'
})
export class BudgetsComponent implements OnInit {

  #mediaService = inject(MediaQueryService)
    viewports: MediaQuery = {
      isDesktop: false,
      isMobile: false,
      isTablet: false
    }

  @Input() arrNums: number[] = [135, 24, 43, 43]
  arr2: string[] = []
  arr!: string[];
  lengths: number[] = []
  lengths2: number[] = []
    #mediaQueryService = inject(MediaQueryService)
           isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
           isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
           isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))
  calculateArr(ourArr: number[], circumference: number = 100) {
    let finalArr: number[] = []
    let sum = ourArr.reduce((prev, current) => {
        current += prev;
        return current
    })
    for (let i  = 0; i < ourArr.length; i++) {
        finalArr.push(Math.round(((ourArr[i] * circumference) / sum)))
    }
    
    return finalArr

}
  ngOnInit(): void {
   

    this.arrNums = this.calculateArr(this.arrNums);
    this.lengths = this.arrNums
    this.arr = this.arrNums.map((el) => {
        return (el.toString() + " " + (100 - el)).toString()
    })
    
   
   

  }
}
