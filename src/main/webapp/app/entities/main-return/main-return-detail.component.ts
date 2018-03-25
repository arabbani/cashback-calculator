import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MainReturn } from './main-return.model';
import { MainReturnService } from './main-return.service';

@Component({
    selector: 'apsstr-main-return-detail',
    templateUrl: './main-return-detail.component.html'
})
export class MainReturnDetailComponent implements OnInit, OnDestroy {

    mainReturn: MainReturn;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private mainReturnService: MainReturnService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMainReturns();
    }

    load(id) {
        this.mainReturnService.find(id)
            .subscribe((mainReturnResponse: HttpResponse<MainReturn>) => {
                this.mainReturn = mainReturnResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMainReturns() {
        this.eventSubscriber = this.eventManager.subscribe(
            'mainReturnListModification',
            (response) => this.load(this.mainReturn.id)
        );
    }
}
