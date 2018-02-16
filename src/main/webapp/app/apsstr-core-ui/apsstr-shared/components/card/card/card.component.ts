import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'apsstr-card',
  templateUrl: './card.component.html',
  styles: []
})
export class CardComponent implements OnInit {

  @Input() private border?: string; // type: Variation
  @Input() private accent?: string; // type: Variation
  @Input() private textColor?: boolean; // type: Variation
  @Input() private background?: string; // type: Variation
  @Input() private textAlign?: string; // type: Align (default: 'left')
  @Input() private extraClass?: string;
  cardClass: string;

  constructor() {
    this.initializeClass();
  }

  ngOnInit() {
    this.initializeClass();
    if (this.border) {
      this.cardClass += ` border-${this.border}`;
    }
    if (this.accent) {
      this.cardClass += ` card-accent-${this.accent}`;
    }
    if (this.textColor) {
      this.cardClass += ` text-${this.textColor}`;
    }
    if (this.background) {
      this.cardClass += ` bg-${this.background}`;
    }
    if (this.textAlign) {
      this.cardClass += ` text-${this.textAlign}`;
    }
    if (this.extraClass) {
      this.cardClass += ` ${this.extraClass}`;
    }
  }

  private initializeClass(): void {
    this.cardClass = 'card';
  }

}
