import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MediaQueryService } from './shared-services/media-query.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MediaQuery } from './shared-interfaces/media-query.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  #mediaQueryService = inject(MediaQueryService)
  viewports: MediaQuery = {
      isDesktop: false,
      isMobile: false,
      isTablet: false
    }

  ngOnInit(): void {
    
    this.#mediaQueryService.viewports.subscribe(viewports => {
      console.log("viewports is")
    
      this.viewports.isDesktop = viewports.isDesktop
      this.viewports.isMobile = viewports.isMobile
      this.viewports.isTablet = viewports.isTablet

    })
   
  }
    ngAfterViewInit(): void {
      
      setTimeout(() => {
        this.#mediaQueryService.setViewPort()
      }, 10)
    }
}
