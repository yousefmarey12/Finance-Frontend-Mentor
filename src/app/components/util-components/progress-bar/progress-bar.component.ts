import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, signal, Signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent implements OnInit, OnChanges {
  ngOnChanges(): void {
    console.log("homedawg")
    if (this.isDeposit && ((+this.amountPercentage) + (+this.variableAmount)) > 100) {
      this.signal.set(true)
      console.log("hello why am I running")
      this.variableAmount = (100 - (+this.amountPercentage)).toString();
  
    }
    else if (!this.isDeposit && +this.amountPercentage - +this.variableAmount < 0) {
      this.signal.set(true)
      this.variableAmount = this.amountPercentage
    }
    else {
      this.signal.set(false)
    }
  }
  @Input() theme1: string = ''
  @Input() amountPercentage: string = ''
  @Input() variableAmount: string = ''
  @Input() theme2: string = 'transparent'
  @Input() isDeposit: boolean = true
  @Input() signal = signal(false)
  calculatedAmount: string = ''
  ngOnInit(): void {


    console.log("isDeposit")
    console.log(this.isDeposit)
    if (this.isDeposit) {
      this.amountPercentage = (+this.amountPercentage + 1.5).toString()
      
      this.calculatedAmount = (parseInt(this.amountPercentage) + parseInt(this.variableAmount)).toString()
     
    }
    else {
      this.calculatedAmount = (parseInt(this.amountPercentage) - parseInt(this.variableAmount)).toString()
      this.calculatedAmount = (+this.calculatedAmount + 1.5).toString()
      if (+this.calculatedAmount < 0) {
        this.calculatedAmount = '0'
      }
    }
  }

  

}
