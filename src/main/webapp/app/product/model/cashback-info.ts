import { Offer } from '../../entities';
import { OfferBenefit } from './offer-benefit';

export class CashbackInfo {

    constructor(
        public readonly offer: Offer,
        public offerBenefit: OfferBenefit,
        public readonly dummy: boolean
    ) {}
}
