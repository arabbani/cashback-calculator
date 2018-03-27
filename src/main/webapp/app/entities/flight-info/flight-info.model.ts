import { Region } from '..';
import { FlightClass } from '../flight-class';

export class FlightInfo {
    constructor(
        public id?: number,
        public types?: Region[],
        public origins?: Region[],
        public travelClasses?: FlightClass[],
    ) {
    }
}
