import { CommonModule } from '@angular/common';
import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, computed, ElementRef, inject, Input, OnChanges, Renderer2, Signal, signal, ViewChild, viewChild, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MediaQueryService } from '../../../shared-services/media-query.service';
import { HoverDirective } from '../../../shared-directives/hover.directive';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-navigation-btn',
  standalone: true,
  imports: [CommonModule, HoverDirective],
  templateUrl: './navigation-btn.component.html',
  styleUrl: './navigation-btn.component.css',
  animations: [
      trigger('minimize', [
        transition('* => void', [animate(100, style({
          transform: 'translateX(-100%)'
        }))]),
        transition('void => *', style(
          {
            transform: 'translateX(-100%)'
          }
        ))
      ])
    ]
})
export class NavigationBtnComponent implements AfterViewInit,  AfterViewChecked {
   @Input() btnTitle: string = ''
   @Input() isActive: boolean = false;
   @Input() isShown: WritableSignal<boolean> = signal(true)
   @ViewChild('svgContainer') svgContainer: any
   #mediaQueryService = inject(MediaQueryService)
   isMobile = toSignal(this.#mediaQueryService.mediaQuery('max', 'md'));
   isDesktop = toSignal(this.#mediaQueryService.mediaQuery('min', 'lg'));
   
   isTablet  = computed(() => (!this.isMobile() && !this.isDesktop()))
   @Input() svgContent!: string;

   constructor(private el: ElementRef, private renderer: Renderer2) {}
  ngAfterViewChecked(): void {
      this.isActive ? this.renderer.setAttribute(this.svgContainer.nativeElement.children[0].children[0].children[0], 'fill', '#277C78') : this.renderer.setAttribute(this.svgContainer.nativeElement.children[0].children[0].children[0], 'fill', '#B3B3B3')
  }



    // Clear existing content

   

  ngAfterViewInit(): void {
    this.renderer.setProperty(this.svgContainer.nativeElement, 'innerHTML', '');
    const svgElement = this.renderer.createElement('div');
    svgElement.innerHTML = this.svgContent;
    this.renderer.appendChild(this.svgContainer.nativeElement, svgElement);
    this.isActive ? this.renderer.addClass(this.svgContainer.nativeElement, 'active') : ''
  }
  
}