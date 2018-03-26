import { CommonInput } from '.';

export class FlightInput extends CommonInput {

    public travelTypeId: number;
    public flightClassId: number;
    public originId: number;
    public flightTypeId: number;

    constructor() {
        super();
    }
}
