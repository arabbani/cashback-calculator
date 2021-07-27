import { Injectable } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';

@Injectable()
export class BroadcastSubCategoryCodeService {

  constructor(private jhiEventManager: JhiEventManager) { }

  broadcast(subCategoryCode: string): void {
    this.jhiEventManager.broadcast({ name: 'newSubCategoryCode', content: subCategoryCode });
  }
}
