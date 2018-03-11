import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TravelType } from './travel-type.model';
import { TravelTypeService } from './travel-type.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-travel-type',
    templateUrl: './travel-type.component.html'
})
export class TravelTypeComponent implements OnInit, OnDestroy {
travelTypes: TravelType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private travelTypeService: TravelTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.travelTypeService.query().subscribe(
            (res: HttpResponse<TravelType[]>) => {
                this.travelTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTravelTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TravelType) {
        return item.id;
    }
    registerChangeInTravelTypes() {
        this.eventSubscriber = this.eventManager.subscribe('travelTypeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
