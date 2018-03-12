import { Injectable } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';

import { StoredCashback } from '../../../model/stored-cashback';
import { StoredCashbackService } from './stored-cashback.service';

@Injectable()
export class BroadcastCashbackInfoService {

  constructor(private jhiEventManager: JhiEventManager, private storedCashbackService: StoredCashbackService) {}

    broadcastNewCashbackInfo(newCashbackInfo: StoredCashback): void {
        this.jhiEventManager.broadcast({
            name: 'newCashbackInfos',
            content: newCashbackInfo
        });
        this.storedCashbackService.store(newCashbackInfo);
    }

    broadcastStoredCashbackInfo(storedCashbackInfo: StoredCashback): void {
        this.jhiEventManager.broadcast({
            name: 'storedCashbackInfos',
            content: storedCashbackInfo
        });
    }

}
