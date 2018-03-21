import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Circle } from './circle.model';
import { CircleService } from './circle.service';

@Component({
    selector: 'apsstr-circle-detail',
    templateUrl: './circle-detail.component.html'
})
export class CircleDetailComponent implements OnInit, OnDestroy {

    circle: Circle;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private circleService: CircleService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCircles();
    }

    load(id) {
        this.circleService.find(id)
            .subscribe((circleResponse: HttpResponse<Circle>) => {
                this.circle = circleResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCircles() {
        this.eventSubscriber = this.eventManager.subscribe(
            'circleListModification',
            (response) => this.load(this.circle.id)
        );
    }
}
