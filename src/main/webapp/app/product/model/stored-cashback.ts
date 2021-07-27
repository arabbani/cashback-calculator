import { CashbackInfo } from './cashback-info';

export class StoredCashback {

    constructor(
        public readonly cashbackInfos: CashbackInfo[],
        public readonly input: any,
        public readonly subCategoryCode?: string
    ) {}
}
