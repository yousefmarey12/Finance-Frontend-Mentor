import { Directive, ElementRef, OnInit, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHover]',
  standalone: true
})
export class HoverDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }
 

  @HostListener('mouseenter') onMouseEnter() {
    
    this.renderer.addClass(this.el.nativeElement, 'hover')
  }
  @HostListener('mouseleave') onMouseLeave() {

    this.renderer.removeClass(this.el.nativeElement, 'hover')
  }
}
