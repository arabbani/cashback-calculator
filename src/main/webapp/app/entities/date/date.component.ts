import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Date } from './date.model';
import { DateService } from './date.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-date',
    templateUrl: './date.component.html'
})
export class DateComponent implements OnInit, OnDestroy {
dates: Date[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private dateService: DateService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.dateService.query().subscribe(
            (res: HttpResponse<Date[]>) => {
                this.dates = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDates();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Date) {
        return item.id;
    }
    registerChangeInDates() {
        this.eventSubscriber = this.eventManager.subscribe('dateListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
