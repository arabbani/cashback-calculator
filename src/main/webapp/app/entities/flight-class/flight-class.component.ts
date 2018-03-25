import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FlightClass } from './flight-class.model';
import { FlightClassService } from './flight-class.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-flight-class',
    templateUrl: './flight-class.component.html'
})
export class FlightClassComponent implements OnInit, OnDestroy {
flightClasses: FlightClass[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private flightClassService: FlightClassService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.flightClassService.query().subscribe(
            (res: HttpResponse<FlightClass[]>) => {
                this.flightClasses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFlightClasses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FlightClass) {
        return item.id;
    }
    registerChangeInFlightClasses() {
        this.eventSubscriber = this.eventManager.subscribe('flightClassListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
