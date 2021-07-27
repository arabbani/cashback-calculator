import { CommonTravelInput } from './common-travel-input';

export class BusInput extends CommonTravelInput {

    public from: number;
    public to: number;

    constructor() {
        super();
    }
}
