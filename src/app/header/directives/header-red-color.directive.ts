import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHeaderRedColor]'
})
export class HeaderRedColorDirective {

  constructor(element: ElementRef) {
    element.nativeElement.style.color = '#8BC34A';
   }

}
