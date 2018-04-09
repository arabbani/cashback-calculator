import { BaseEntity } from './../../shared';
import { Region } from '..';

export class HotelInfo implements BaseEntity {
    constructor(
        public id?: number,
        public types?: Region[]
    ) {
    }
}
