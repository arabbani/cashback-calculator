import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { FlightClass } from './flight-class.model';
import { FlightClassService } from './flight-class.service';

@Component({
    selector: 'apsstr-flight-class-detail',
    templateUrl: './flight-class-detail.component.html'
})
export class FlightClassDetailComponent implements OnInit, OnDestroy {

    flightClass: FlightClass;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private flightClassService: FlightClassService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFlightClasses();
    }

    load(id) {
        this.flightClassService.find(id)
            .subscribe((flightClassResponse: HttpResponse<FlightClass>) => {
                this.flightClass = flightClassResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFlightClasses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'flightClassListModification',
            (response) => this.load(this.flightClass.id)
        );
    }
}
