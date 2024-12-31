import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../small/button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() title: string = ''
  @Input() isTransparent: boolean = false;
}
