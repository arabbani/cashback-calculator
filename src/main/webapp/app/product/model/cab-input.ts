import { CommonTravelInput } from './common-travel-input';

export class CabInput extends CommonTravelInput {

    public cityId: number;
    public serviceProvidersId: Array<number>;

    constructor() {
        super();
    }
}
