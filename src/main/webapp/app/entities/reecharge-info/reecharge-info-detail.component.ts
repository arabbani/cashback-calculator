import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ReechargeInfo } from './reecharge-info.model';
import { ReechargeInfoService } from './reecharge-info.service';

@Component({
    selector: 'apsstr-reecharge-info-detail',
    templateUrl: './reecharge-info-detail.component.html'
})
export class ReechargeInfoDetailComponent implements OnInit, OnDestroy {

    reechargeInfo: ReechargeInfo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private reechargeInfoService: ReechargeInfoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInReechargeInfos();
    }

    load(id) {
        this.reechargeInfoService.find(id)
            .subscribe((reechargeInfoResponse: HttpResponse<ReechargeInfo>) => {
                this.reechargeInfo = reechargeInfoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInReechargeInfos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'reechargeInfoListModification',
            (response) => this.load(this.reechargeInfo.id)
        );
    }
}
