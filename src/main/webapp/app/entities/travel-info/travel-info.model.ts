import { TravelType } from '..';
import { BusInfo } from '../bus-info';
import { FlightInfo } from '../flight-info';
import { HotelInfo } from '../hotel-info';
import { BaseEntity } from './../../shared';

export class TravelInfo implements BaseEntity {
    constructor(
        public id?: number,
        public flightInfo?: FlightInfo,
        public busInfo?: BusInfo,
        public hotelInfo?: HotelInfo,
        public types?: TravelType[],
    ) {
    }
}
