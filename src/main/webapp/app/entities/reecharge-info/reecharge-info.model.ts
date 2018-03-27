import { Circle, ReechargePlanType } from '..';

export class ReechargeInfo {
    constructor(
        public id?: number,
        public circles?: Circle[],
        public reechargePlanTypes?: ReechargePlanType[],
    ) {
    }
}
