import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'apsstr-card-footer',
  templateUrl: './card-footer.component.html',
  styles: []
})
export class CardFooterComponent implements OnInit {

  @Input() extraClass?: string;
  footerClass: string;

  constructor() {
    this.initializeClass();
  }

  ngOnInit() {
    this.initializeClass();
    if (this.extraClass) {
      this.footerClass += ` ${this.extraClass}`;
    }
  }

  private initializeClass(): void {
    this.footerClass = `card-footer`;
  }

}
