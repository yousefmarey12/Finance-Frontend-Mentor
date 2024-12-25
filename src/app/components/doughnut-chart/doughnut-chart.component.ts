import { Component, Input, OnInit } from '@angular/core';
import { DisplayMoney } from '../../shared-pipes/display-number.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports: [DisplayMoney, CommonModule],
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.css'
})
export class DoughnutChartComponent implements OnInit {
  @Input() color1: string = ''
  @Input() color2: string = ''
  @Input() color3: string = ''
  @Input() color4: string = ''
  @Input() amountSpent: string = ''
  @Input() budget: string =''
  @Input() lengths: number[] = []
  @Input() arr: string[] =[
    "40 60",
    "30 70",
    "20 80",
    "10 90"
  ]
 
 

  offsets: string[] = [

  ]

  ngOnInit(): void {
    let totalLength: number = 0;
    this.offsets.push("25")
    console.log(this.lengths)
    this.lengths.map((el, i) => {
        totalLength += el;
        this.offsets.push(((100 - totalLength + 25)).toString())
    })

    console.log(this.offsets)
   


  }

  
}
