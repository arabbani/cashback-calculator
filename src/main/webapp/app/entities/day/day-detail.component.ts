import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Day } from './day.model';
import { DayService } from './day.service';

@Component({
    selector: 'apsstr-day-detail',
    templateUrl: './day-detail.component.html'
})
export class DayDetailComponent implements OnInit, OnDestroy {

    day: Day;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dayService: DayService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDays();
    }

    load(id) {
        this.dayService.find(id)
            .subscribe((dayResponse: HttpResponse<Day>) => {
                this.day = dayResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDays() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dayListModification',
            (response) => this.load(this.day.id)
        );
    }
}
