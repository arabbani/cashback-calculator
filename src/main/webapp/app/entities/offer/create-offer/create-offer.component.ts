import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { Offer, OfferService } from '..';
import { OfferTypes } from '../../../apsstr-core-ui-config';
import { OfferPolicy, OfferPolicyService } from '../../offer-policy';
import { OfferType, OfferTypeService } from '../../offer-type';

@Component({
  selector: 'apsstr-create-offer',
  templateUrl: './create-offer.component.html',
  styles: []
})
export class CreateOfferComponent implements OnInit {

  offer: Offer;
  offerTypes: OfferType[];
  offerPolicies: OfferPolicy[];

  isCoupon: boolean;
  defaultOfferType;
  defaultOfferPolicy;

  enabledTabs: Array<boolean>;

  constructor(private offerService: OfferService, private offerTypeService: OfferTypeService, private offerPolicyService: OfferPolicyService) { }

  ngOnInit() {
    this.initialize();
    this.loadOfferTypes();
    this.offer = new Offer();
  }

  initialize(): void {
    this.enabledTabs = _.times(2, _.stubFalse);
    this.enabledTabs[0] = true;
    this.isCoupon = false;
    this.defaultOfferType = { id: null, name: 'Select Type' };
    this.defaultOfferPolicy = { id: null, name: 'Select Policy' };
  }

  loadOfferTypes(): void {
    this.offerTypeService.query().subscribe(
      (res: HttpResponse<OfferType[]>) => {
        this.offerTypes = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  loadOfferPolicies(): void {
    this.offerPolicyService.query().subscribe(
      (res: HttpResponse<OfferPolicy[]>) => {
        this.offerPolicies = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  goToNextTab(currentTab: number): void {

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
