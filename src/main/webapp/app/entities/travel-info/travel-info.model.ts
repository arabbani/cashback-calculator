import { TravelType } from '..';
import { BusInfo } from '../bus-info';
import { FlightInfo } from '../flight-info';

export class TravelInfo {
    constructor(
        public id?: number,
        public flightInfo?: FlightInfo,
        public busInfo?: BusInfo,
        public types?: TravelType[],
    ) {
    }
}
