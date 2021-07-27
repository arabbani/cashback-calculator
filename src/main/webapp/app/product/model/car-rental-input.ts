import { CommonTravelInput } from './common-travel-input';

export class CarRentalInput extends CommonTravelInput {

    public cityId: number;
    public serviceProvidersId: Array<number>;

    constructor() {
        super();
    }
}