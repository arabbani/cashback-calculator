import { CommonInput } from '.';

export class FlightInput extends CommonInput {

    public travelTypeId: number;
    public flightClassId: number;
    public flightOriginId: number;
    public flightTypeId: number;

    constructor() {
        super();
    }
}
