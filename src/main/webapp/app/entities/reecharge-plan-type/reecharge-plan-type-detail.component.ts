import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ReechargePlanType } from './reecharge-plan-type.model';
import { ReechargePlanTypeService } from './reecharge-plan-type.service';

@Component({
    selector: 'apsstr-reecharge-plan-type-detail',
    templateUrl: './reecharge-plan-type-detail.component.html'
})
export class ReechargePlanTypeDetailComponent implements OnInit, OnDestroy {

    reechargePlanType: ReechargePlanType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private reechargePlanTypeService: ReechargePlanTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInReechargePlanTypes();
    }

    load(id) {
        this.reechargePlanTypeService.find(id)
            .subscribe((reechargePlanTypeResponse: HttpResponse<ReechargePlanType>) => {
                this.reechargePlanType = reechargePlanTypeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInReechargePlanTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'reechargePlanTypeListModification',
            (response) => this.load(this.reechargePlanType.id)
        );
    }
}
