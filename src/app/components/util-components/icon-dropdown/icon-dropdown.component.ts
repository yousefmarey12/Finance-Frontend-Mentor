import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
export interface navigationConfig {
  title: string,
  path: string
}
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
  router = inject(Router)
  route = inject(ActivatedRoute)
  @Input() items: navigationConfig[] = []
  active: boolean = false
  
  value: string = ''
  onClickItem(value: navigationConfig) {
    this.value = value.title
    console.log("route is")
    console.log(this.route)
    this.router.navigate([value.path], {
      relativeTo:  this.route
    })
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
