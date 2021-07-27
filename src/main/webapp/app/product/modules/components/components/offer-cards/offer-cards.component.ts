import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { List } from 'immutable';

import { CashbackInfo } from '../../../../model';

@Component({
  selector: 'apsstr-offer-cards',
  templateUrl: './offer-cards.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferCardsComponent {

  @Input() offers: List<CashbackInfo>;

  constructor() { }

}
