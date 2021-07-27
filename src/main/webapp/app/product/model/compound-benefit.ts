import { Benefit } from './benefit';

export class CompoundBenefit {
    constructor(
        public readonly offerReturnId: number,
        public readonly minimum: number,
        public readonly maximum: number,
        public readonly benefits: Benefit[]
    ) { }
}
