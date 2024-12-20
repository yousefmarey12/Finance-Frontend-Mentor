import { AfterViewInit, Component, computed, inject, OnInit, Signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MediaQueryService } from './shared-services/media-query.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MediaQuery } from './shared-interfaces/media-query.interface';
import { toSignal } from "@angular/core/rxjs-interop"
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, NavigationComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
   #mediaQueryService = inject(MediaQueryService)
   isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
   isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
   isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))

  
   
    


}
