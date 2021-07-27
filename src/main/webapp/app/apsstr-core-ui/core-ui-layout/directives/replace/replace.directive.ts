import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  // tslint:disable-next-line:max-line-length
  selector: '[apsstrHostReplace], apsstr-aside, apsstr-breadcrumbs, apsstr-footer, apsstr-header, apsstr-sidebar, apsstr-sidebar-footer, apsstr-sidebar-form, apsstr-sidebar-header, apsstr-sidebar-minimizer, apsstr-sidebar-nav, apsstr-sidebar-nav-dropdown, apsstr-sidebar-nav-item, apsstr-sidebar-nav-link, apsstr-sidebar-nav-title'
})
export class ReplaceDirective implements OnInit {

  constructor(private el: ElementRef) { }

  // wait for the component to render completely
  ngOnInit() {
    const nativeElement: HTMLElement = this.el.nativeElement;
    const parentElement: HTMLElement = nativeElement.parentElement;
    // move all children out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);
  }
}
