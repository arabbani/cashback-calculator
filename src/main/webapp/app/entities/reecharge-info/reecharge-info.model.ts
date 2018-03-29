import { BaseEntity } from './../../shared';

export class ReechargeInfo implements BaseEntity {
    constructor(
        public id?: number,
        public circles?: BaseEntity[],
        public reechargePlanTypes?: BaseEntity[],
    ) {
    }
}
