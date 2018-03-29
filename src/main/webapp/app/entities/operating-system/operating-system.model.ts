import { BaseEntity } from './../../shared';

export class OperatingSystem implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public type?: BaseEntity,
    ) {
    }
}
