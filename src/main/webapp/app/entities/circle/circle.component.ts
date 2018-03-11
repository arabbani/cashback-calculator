import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Circle } from './circle.model';
import { CircleService } from './circle.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-circle',
    templateUrl: './circle.component.html'
})
export class CircleComponent implements OnInit, OnDestroy {
circles: Circle[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private circleService: CircleService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.circleService.query().subscribe(
            (res: HttpResponse<Circle[]>) => {
                this.circles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCircles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Circle) {
        return item.id;
    }
    registerChangeInCircles() {
        this.eventSubscriber = this.eventManager.subscribe('circleListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
