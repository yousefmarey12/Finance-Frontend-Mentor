import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tertiary',
  standalone: true,
  imports: [],
  templateUrl: './tertiary.component.html',
  styleUrl: './tertiary.component.css'
})
export class TertiaryComponent {
  @Input() transparent: boolean = false
}
