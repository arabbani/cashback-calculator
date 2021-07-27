export class Benefit {
    constructor(
        public readonly returnInfoId: number,
        public readonly type: string,
        public readonly minimum: number,
        public readonly maximum: number,
    ) { }
}
