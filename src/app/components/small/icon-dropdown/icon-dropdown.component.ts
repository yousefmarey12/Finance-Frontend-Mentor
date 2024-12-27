import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-dropdown.component.html',
  styleUrl: './icon-dropdown.component.css',
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
export class IconDropdownComponent {
  dropdownState: string = 'close'

  @Input() items: string[] = []
  active: boolean = false
  
  value: string = ''
  onClickItem(value: string) {
    this.value = value
    
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
