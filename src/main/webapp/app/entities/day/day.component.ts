import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Day } from './day.model';
import { DayService } from './day.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-day',
    templateUrl: './day.component.html'
})
export class DayComponent implements OnInit, OnDestroy {
days: Day[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private dayService: DayService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.dayService.query().subscribe(
            (res: HttpResponse<Day[]>) => {
                this.days = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDays();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Day) {
        return item.id;
    }
    registerChangeInDays() {
        this.eventSubscriber = this.eventManager.subscribe('dayListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
