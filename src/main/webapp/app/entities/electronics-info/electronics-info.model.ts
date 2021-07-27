import { Brand } from '..';
import { BaseEntity } from './../../shared';

export class ElectronicsInfo implements BaseEntity {
    constructor(
        public id?: number,
        public brands?: Brand[],
    ) {
    }
}
