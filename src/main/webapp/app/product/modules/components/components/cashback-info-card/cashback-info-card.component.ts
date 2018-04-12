import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import * as _ from 'lodash';

import { CashbackInfo, OfferTypes } from '../../../..';
import { ASSET_PATH } from '../../../../../apsstr-core-ui-config';

@Component({
  selector: 'apsstr-cashback-info-card',
  templateUrl: './cashback-info-card.component.html',
  styleUrls: ['./cashback-info-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CashbackInfoCardComponent implements OnChanges {

  @Input() cashbackInfo: CashbackInfo;
  showDescription = false;
  descriponList: Array<string>;
  private logoUrl = ASSET_PATH.imageBase + ASSET_PATH.logo;
  showCouponCode = false;
  copyCodeButtonText = 'Copy Code';
  copyCodeButtonIcon = 'fa fa-clipboard';

  constructor() { }

  ngOnChanges() {
    this.constructDescription();
  }

  toggleDescription(): void {
    this.showDescription = !this.showDescription;
  }

  toggleCouponCode(): void {
    if (!this.showCouponCode) {
      this.showCouponCode = !this.showCouponCode;
    }
  }

  constructImageUrl(imageName: string): string {
    return `${this.logoUrl}/merchant/${_.snakeCase(imageName)}.png`;
  }

  isCoupon(): boolean {
    const offerType = this.cashbackInfo.offer.type['name'];
    return offerType === OfferTypes.COUPON || offerType === OfferTypes.LDC;
  }

  onCodeCopy(): void {
    this.copyCodeButtonText = 'Copied';
    this.copyCodeButtonIcon = 'fa fa-check';
  }

  private constructDescription(): void {
    this.descriponList = _.map(_.split(this.cashbackInfo.offer.description, '@'), _.trim);
  }

}
