import { Directive, ElementRef, OnInit, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHover]',
  standalone: true
})
export class HoverDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }
 appHover: boolean = false


  @HostListener('mouseenter') onMouseEnter() {
    if (this.appHover) {
      return;
    }
    this.renderer.addClass(this.el.nativeElement, 'hover')
  }
  @HostListener('mouseleave') onMouseLeave() {
    if (this.appHover) {
      return;
    }
    this.renderer.removeClass(this.el.nativeElement, 'hover')
  }
}
