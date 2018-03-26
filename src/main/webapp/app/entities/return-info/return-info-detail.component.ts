import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ReturnInfo } from './return-info.model';
import { ReturnInfoService } from './return-info.service';

@Component({
    selector: 'apsstr-return-info-detail',
    templateUrl: './return-info-detail.component.html'
})
export class ReturnInfoDetailComponent implements OnInit, OnDestroy {

    returnInfo: ReturnInfo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private returnInfoService: ReturnInfoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInReturnInfos();
    }

    load(id) {
        this.returnInfoService.find(id)
            .subscribe((returnInfoResponse: HttpResponse<ReturnInfo>) => {
                this.returnInfo = returnInfoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInReturnInfos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'returnInfoListModification',
            (response) => this.load(this.returnInfo.id)
        );
    }
}
