import { BaseEntity } from './../../shared';

export class Affiliate implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public url?: string,
        public active?: boolean,
        public credentials?: BaseEntity[],
        public offers?: BaseEntity[],
    ) {
        this.active = false;
    }
}
