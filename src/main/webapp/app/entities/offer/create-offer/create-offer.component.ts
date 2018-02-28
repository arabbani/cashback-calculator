import { Component, OnInit } from '@angular/core';

import { OfferService, Offer } from '..';

@Component({
  selector: 'apsstr-create-offer',
  templateUrl: './create-offer.component.html',
  styles: []
})
export class CreateOfferComponent implements OnInit {

  offer: Offer;

  constructor(private offerService: OfferService) { }

  ngOnInit() {
    this.offer = new Offer();
  }

}
