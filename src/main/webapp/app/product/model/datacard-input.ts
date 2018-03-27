import { CommonReechargeInput } from './common-reecharge-input';

export class DatacardInput extends CommonReechargeInput {

    public circleId: number;
    public reechargePlaneTypeId: number;

    constructor() {
        super();
    }
}
