import { Component, OnInit } from '@angular/core';
import { DoughnutChartComponent } from '../../components/doughnut-chart/doughnut-chart.component';
import { MiniCardComponent } from '../../components/mini-card/mini-card.component';

@Component({
  selector: 'app-spending-summary',
  standalone: true,
  imports: [DoughnutChartComponent, MiniCardComponent],
  templateUrl: './spending-summary.component.html',
  styleUrl: './spending-summary.component.css'
})
export class SpendingSummaryComponent implements OnInit {
  arr: number[] =[16, 6.1, 61.4, 16.5]
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
