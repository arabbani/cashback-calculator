import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ReechargePlanType } from './reecharge-plan-type.model';
import { ReechargePlanTypeService } from './reecharge-plan-type.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-reecharge-plan-type',
    templateUrl: './reecharge-plan-type.component.html'
})
export class ReechargePlanTypeComponent implements OnInit, OnDestroy {
reechargePlanTypes: ReechargePlanType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private reechargePlanTypeService: ReechargePlanTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.reechargePlanTypeService.query().subscribe(
            (res: HttpResponse<ReechargePlanType[]>) => {
                this.reechargePlanTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInReechargePlanTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ReechargePlanType) {
        return item.id;
    }
    registerChangeInReechargePlanTypes() {
        this.eventSubscriber = this.eventManager.subscribe('reechargePlanTypeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
