import { BaseEntity } from './../../shared';

export class RechargeInfo implements BaseEntity {
    constructor(
        public id?: number,
        public circles?: BaseEntity[],
        public rechargePlanTypes?: BaseEntity[],
    ) {
    }
}
