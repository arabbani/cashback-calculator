import { CommonTravelInput } from './common-travel-input';

export class FlightInput extends CommonTravelInput {

    public travelTypeId: number;
    public flightClassId: number;
    public flightOriginId: number;
    public flightTypeId: number;

    constructor() {
        super();
    }
}
