import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'apsstr-card-body',
  templateUrl: './card-body.component.html',
  styles: []
})
export class CardBodyComponent implements OnInit {

  @Input() private color?: boolean; // type: Variation
  @Input() private extraClass?: string;
  bodyClass: string;

  constructor() {
    this.initializeClass();
  }

  ngOnInit() {
    this.initializeClass();
    if (this.color) {
      this.bodyClass += ` text-${this.color}`;
    }
    if (this.extraClass) {
      this.bodyClass += ` ${this.extraClass}`;
    }
  }

  private initializeClass(): void {
    this.bodyClass = `card-body`;
  }

}
