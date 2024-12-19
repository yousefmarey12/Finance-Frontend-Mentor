import { Component, inject, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { MiniCardComponent } from '../../../components/mini-card/mini-card.component';
import { DoughnutChartComponent } from '../../../components/doughnut-chart/doughnut-chart.component';
import { CommonModule } from '@angular/common';
import { MediaQuery } from '../../../shared-interfaces/media-query.interface';
import { MediaQueryService } from '../../../shared-services/media-query.service';

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
    this.#mediaService.viewports.subscribe(viewports => {
      this.viewports.isDesktop = viewports.isDesktop
      this.viewports.isMobile = viewports.isMobile
      this.viewports.isTablet = viewports.isTablet
    })

    this.arr2 = this.arrNums.map(el => el.toString())
    this.arrNums = this.calculateArr(this.arrNums);
    this.lengths = this.arrNums
    this.arr = this.arrNums.map((el) => {
        return (el.toString() + " " + (100 - el)).toString()
    })
    this.lengths2 = this.calculateArr(this.arr2.map(el => (+el)), (100 - (2 * Math.PI * 2)))
    
    this.arr2 = this.lengths2.map((el) => {
      return (el.toString() + " " + Math.round(((100 - 2 * Math.PI * 2) - el))).toString()
    })
   

  }
}
