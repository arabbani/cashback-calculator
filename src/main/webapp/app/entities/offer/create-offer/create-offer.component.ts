import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Offer, OfferService } from '..';
import { OfferType, OfferTypeService } from '../../offer-type';
import { OfferTypes } from '../../../apsstr-core-ui-config';

@Component({
  selector: 'apsstr-create-offer',
  templateUrl: './create-offer.component.html',
  styles: []
})
export class CreateOfferComponent implements OnInit {

  offer: Offer;
  offerTypes: OfferType[];

  isCoupon: boolean;
  defaultOfferType;

  constructor(private offerService: OfferService, private offerTypeService: OfferTypeService) { }

  ngOnInit() {
    this.initialize();
    this.loadOfferTypes();
    this.offer = new Offer();
  }

  initialize(): void {
    this.isCoupon = false;
    this.defaultOfferType = { id: null, name: 'Select Type' };
  }

  loadOfferTypes(): void {
    this.offerTypeService.query().subscribe(
      (res: HttpResponse<OfferType[]>) => {
        this.offerTypes = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  onOfferTypeChange(offerType: OfferType): void {
    switch (offerType.name) {
      case OfferTypes.coupon:
      case OfferTypes.luckyDrawCoupon:
        this.isCoupon = true;
        break;
      case OfferTypes.deal:
      case OfferTypes.luckyDrawDeal:
        this.isCoupon = false;
        break;
      default:
        this.isCoupon = false;
        break;
    }
  }

  private onError(error) {
    console.log('ERROR');
  }

}
