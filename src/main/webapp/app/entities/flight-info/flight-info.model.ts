import { Region } from '..';
import { FlightClass } from '../flight-class';
import { BaseEntity } from './../../shared';

export class FlightInfo implements BaseEntity {
    constructor(
        public id?: number,
        public types?: Region[],
        public origins?: Region[],
        public travelClasses?: FlightClass[],
    ) {
    }
}
