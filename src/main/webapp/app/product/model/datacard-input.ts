import { CommonRechargeInput } from './common-recharge-input';

export class DatacardInput extends CommonRechargeInput {

    public circleId: number;
    public rechargePlaneTypeId: number;

    constructor() {
        super();
    }
}
