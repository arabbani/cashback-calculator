import { BaseEntity } from './../../shared';

export class BusInfo implements BaseEntity {
    constructor(
        public id?: number,
        public froms?: BaseEntity[],
        public tos?: BaseEntity[],
    ) {
    }
}
