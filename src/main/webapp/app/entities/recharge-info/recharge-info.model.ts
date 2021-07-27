import { Circle, RechargePlanType } from '..';
import { BaseEntity } from './../../shared';

export class RechargeInfo implements BaseEntity {
    constructor(
        public id?: number,
        public circles?: Circle[],
        public rechargePlanTypes?: RechargePlanType[],
    ) {
    }
}
