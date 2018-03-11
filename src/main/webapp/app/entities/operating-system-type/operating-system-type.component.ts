import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OperatingSystemType } from './operating-system-type.model';
import { OperatingSystemTypeService } from './operating-system-type.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-operating-system-type',
    templateUrl: './operating-system-type.component.html'
})
export class OperatingSystemTypeComponent implements OnInit, OnDestroy {
operatingSystemTypes: OperatingSystemType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private operatingSystemTypeService: OperatingSystemTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.operatingSystemTypeService.query().subscribe(
            (res: HttpResponse<OperatingSystemType[]>) => {
                this.operatingSystemTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOperatingSystemTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: OperatingSystemType) {
        return item.id;
    }
    registerChangeInOperatingSystemTypes() {
        this.eventSubscriber = this.eventManager.subscribe('operatingSystemTypeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
