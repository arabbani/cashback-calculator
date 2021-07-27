import { CommonRechargeInput } from './common-recharge-input';

export class MobileInput extends CommonRechargeInput {

    public circleId: number;
    public rechargePlaneTypeId: number;

    constructor() {
        super();
    }
}
