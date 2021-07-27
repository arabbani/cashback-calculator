import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { JhiEventManager } from 'ng-jhipster';
import { LocalStorageService } from 'ngx-webstorage';

import { CASHBACK_STORE_SIZE } from '../../../constants';
import { StoredCashback } from '../../../model/';

@Injectable()
export class StoredCashbackService {

    constructor(private localStorageService: LocalStorageService, private jhiEventManager: JhiEventManager) {}

    store(storedCashback: StoredCashback): void {
        const storageName = this.constructTemporaryStorageName();
        const temporaryStoredCashback = this.localStorageService.retrieve(storageName);
        if (!temporaryStoredCashback) {
            this.storeTemporaryCashback(_.cloneDeep(storedCashback));
        } else {
            this.storeCashback(_.cloneDeep(temporaryStoredCashback));
            this.storeTemporaryCashback(_.cloneDeep(storedCashback));
        }
    }

    storeFromTemporaryStorage(): void {
        const storageName = this.constructTemporaryStorageName();
        const temporaryStoredCashback = this.localStorageService.retrieve(storageName);
        if (temporaryStoredCashback) {
            this.storeCashback(_.cloneDeep(temporaryStoredCashback));
            this.localStorageService.clear(storageName);
        }
    }

    constructStorageName(): string {
        return 'stored_cashback';
    }

    retreiveStoredCashback(): StoredCashback[] {
        const storageName = this.constructStorageName();
        return this.localStorageService.retrieve(storageName);
    }

    private storeCashback(temporaryStoredCashback: StoredCashback): void {
        const storageName = this.constructStorageName();
        let storedCashback = this.localStorageService.retrieve(storageName);
        if (!storedCashback) {
            this.localStorageService.store(storageName, [temporaryStoredCashback]);
        } else {
            if (storedCashback.length === CASHBACK_STORE_SIZE) {
                storedCashback = _.drop(storedCashback);
            }
            storedCashback = _.concat(storedCashback, temporaryStoredCashback);
            this.localStorageService.store(storageName, storedCashback);
        }
        this.jhiEventManager.broadcast({
            name: 'newStoredCashback',
            content: null
        });
    }

    private constructTemporaryStorageName(): string {
        return 'temp_stored_cashback';
    }

    private storeTemporaryCashback(storedCashback: StoredCashback): void {
        const storageName = this.constructTemporaryStorageName();
        const cashbackInfos = storedCashback.cashbackInfos;
        if (cashbackInfos && cashbackInfos.length > 0) {
            this.localStorageService.store(storageName, storedCashback);
        }
    }
}
