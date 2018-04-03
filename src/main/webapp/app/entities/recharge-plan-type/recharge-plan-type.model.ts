import { BaseEntity } from './../../shared';

export class RechargePlanType implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public dataPlan?: boolean,
    ) {
        this.dataPlan = false;
    }
}
