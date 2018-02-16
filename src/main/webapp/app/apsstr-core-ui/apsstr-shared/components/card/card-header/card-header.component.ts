import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'apsstr-card-header',
  templateUrl: './card-header.component.html',
  styles: []
})
export class CardHeaderComponent implements OnInit {

  @Input() extraClass: string;
  headerClass: string;

  constructor() {
    this.initializeClass();
  }

  ngOnInit() {
    this.initializeClass();
    if (this.extraClass) {
      this.headerClass += ` ${this.extraClass}`;
    }
  }

  private initializeClass(): void {
    this.headerClass = `card-header`;
  }
}
