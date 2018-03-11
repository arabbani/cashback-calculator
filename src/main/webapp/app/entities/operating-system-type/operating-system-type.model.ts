import { BaseEntity } from './../../shared';

export class OperatingSystemType implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
