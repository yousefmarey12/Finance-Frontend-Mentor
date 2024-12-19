import { Component } from '@angular/core';
import { NavigationBtnComponent } from '../navigation-btn/navigation-btn.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NavigationBtnComponent, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  isActive: boolean[] = [true, false, false, false, false]
}
