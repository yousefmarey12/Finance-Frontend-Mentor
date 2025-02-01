import { Component, computed, inject, OnInit } from '@angular/core';
import { DoughnutChartComponent } from '../../../util-components/doughnut-chart/doughnut-chart.component';
import { MiniCardComponent } from '../../../util-components/mini-card/mini-card.component';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { MediaQueryService } from '../../../../shared-services/media-query.service';

@Component({
  selector: 'app-spending-summary',
  standalone: true,
  imports: [DoughnutChartComponent, MiniCardComponent, CommonModule],
  templateUrl: './spending-summary.component.html',
  styleUrl: './spending-summary.component.css'
})
export class SpendingSummaryComponent implements OnInit {
  arr: number[] =[16, 6.1, 61.4, 16.5]
  #mediaQueryService = inject(MediaQueryService)
         isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
         isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
         isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))
  
  arrStr: string[] = []
  ngOnInit(): void {
    this.arr = this.calculateArr(this.arr);
    this.arrStr = this.arr.map((el) => {
        return (el.toString() + " " + (100 - el)).toString()
    })
    console.log(this.arrStr)
  }

  calculateArr(ourArr: (number)[], circumference: number = 100) {
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
}
