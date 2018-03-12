export class Benefit {
    constructor(
        public readonly offerReturnId: number,
        public readonly minimumReturn: number,
        public readonly maximumReturn: number,
    ) {}
}
