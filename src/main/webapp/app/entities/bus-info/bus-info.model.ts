import { City } from '..';
import { BaseEntity } from './../../shared';

export class BusInfo implements BaseEntity {
    constructor(
        public id?: number,
        public froms?: City[],
        public tos?: City[],
    ) {
    }
}
