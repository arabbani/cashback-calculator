import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OperatingSystem } from './operating-system.model';
import { OperatingSystemService } from './operating-system.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-operating-system',
    templateUrl: './operating-system.component.html'
})
export class OperatingSystemComponent implements OnInit, OnDestroy {
operatingSystems: OperatingSystem[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private operatingSystemService: OperatingSystemService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.operatingSystemService.query().subscribe(
            (res: HttpResponse<OperatingSystem[]>) => {
                this.operatingSystems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOperatingSystems();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: OperatingSystem) {
        return item.id;
    }
    registerChangeInOperatingSystems() {
        this.eventSubscriber = this.eventManager.subscribe('operatingSystemListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
