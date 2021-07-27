import { CompoundBenefit } from './compound-benefit';

export class OfferBenefit {

    constructor(
        public readonly offerId: number,
        public compoundBenefits: CompoundBenefit[]
    ) {}
}
