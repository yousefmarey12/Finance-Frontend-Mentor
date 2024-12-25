import { Component, Input } from '@angular/core';
import { TertiaryComponent } from '../buttons/tertiary/tertiary.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TertiaryComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() title: string = ''
  @Input() isTransparent: boolean = false;
}
