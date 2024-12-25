import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { InputType } from '../input-field/input-field.component';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HoverDirective } from '../../shared-directives/hover.directive';
@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, HoverDirective],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
  animations: [
    trigger('clickDropdown', [
      state('open', style({
        'opacity': 1
      })),
      state('close', style({
        'opacity': 0
      })),
      transition('open <=> close', [animate('400ms')])
    ])
  ]
})
export class DropdownComponent  {
  dropdownState: string = 'close'
  @Input() placeholder: string = 'Placeholder'
  @Input() prefix: string = ''
  @Input() iconImg: string = ''
  @Input() dropdownValues: string[] = []
  
  active: boolean = false
  
  value: string = ''


  onClickItem(value: string) {
    this.value = value
    this.placeholder = ''
  }

  

  onClick() {
    if (this.dropdownState == 'close') {
      this.dropdownState = 'open'
    }
    else {
      this.dropdownState = 'close'
    }
    this.active = true;
  }

  
  

}
