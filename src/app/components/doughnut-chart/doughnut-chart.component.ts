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
  @Input() arr2: string[] = [

  ]
  @Input() lengths2: number[] =[]
  opacitiesOffsets: string[] = [

  ]

  offsets: string[] = [

  ]

  ngOnInit(): void {
    let totalLength: number = 0;
    this.offsets.push("25")
    this.lengths.map((el, i) => {
        totalLength += el;
        this.offsets.push(((100 - totalLength + 25)).toString())
    })
    let totalLength2: number = 0;
    this.opacitiesOffsets.push("21.8")
    this.lengths2.map((el, i) => {
        totalLength2 += el;
        this.opacitiesOffsets.push((((100 - (2 *Math.PI * 2)) - totalLength2 + 21.8)).toFixed(4).toString())
    })

    console.log("lengths2 is")
    console.log(this.lengths2)
    console.log("opacitiesOffsets is")
    console.log(this.opacitiesOffsets)
    console.log("offsets is")
    console.log(this.offsets)
    console.log("arr2 is")
    console.log(this.arr2)
  }

  
}
