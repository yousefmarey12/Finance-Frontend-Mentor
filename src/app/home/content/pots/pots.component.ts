import { Component } from '@angular/core';
import { TertiaryComponent } from '../../../components/buttons/tertiary/tertiary.component';
import { MiniCardComponent } from '../../../components/mini-card/mini-card.component';

@Component({
  selector: 'app-pots',
  standalone: true,
  imports: [TertiaryComponent, MiniCardComponent],
  templateUrl: './pots.component.html',
  styleUrl: './pots.component.css'
})
export class PotsComponent {

}
