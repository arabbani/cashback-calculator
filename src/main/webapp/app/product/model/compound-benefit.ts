import { Benefit } from './benefit';

export class CompoundBenefit {
    constructor(
        public readonly returnInfoId: number,
        public readonly minimumReturn: number,
        public readonly maximumReturn: number,
        public readonly benefits: Benefit[]
    ) {}
}
