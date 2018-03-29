import { BaseEntity } from './../../shared';

export class ElectronicsInfo implements BaseEntity {
    constructor(
        public id?: number,
        public brands?: BaseEntity[],
    ) {
    }
}
