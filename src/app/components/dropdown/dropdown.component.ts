import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { InputType } from '../input-field/input-field.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent implements AfterViewInit {
  @Input() placeholder: string = ''
  @Input() colorTagCode: string = ''
  @Input() iconImg: string = 'color_tag.svg'
  @ViewChild('select') select!: ElementRef
  getIconValue() {
    return `url("${this.iconImg}") 95% 50% no-repeat`
  }

  ngAfterViewInit(): void {
      console.dir(this.select.nativeElement['0'].innerHTML[0])
  }
  

}
