export class ReechargePlanType {
    constructor(
        public id?: number,
        public name?: string,
        public dataPlan?: boolean,
    ) {
        this.dataPlan = false;
    }
}
