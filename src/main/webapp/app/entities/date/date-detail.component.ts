import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Date } from './date.model';
import { DateService } from './date.service';

@Component({
    selector: 'apsstr-date-detail',
    templateUrl: './date-detail.component.html'
})
export class DateDetailComponent implements OnInit, OnDestroy {

    date: Date;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dateService: DateService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDates();
    }

    load(id) {
        this.dateService.find(id)
            .subscribe((dateResponse: HttpResponse<Date>) => {
                this.date = dateResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDates() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dateListModification',
            (response) => this.load(this.date.id)
        );
    }
}
