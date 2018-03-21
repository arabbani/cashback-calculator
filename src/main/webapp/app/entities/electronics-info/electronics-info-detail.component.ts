import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ElectronicsInfo } from './electronics-info.model';
import { ElectronicsInfoService } from './electronics-info.service';

@Component({
    selector: 'apsstr-electronics-info-detail',
    templateUrl: './electronics-info-detail.component.html'
})
export class ElectronicsInfoDetailComponent implements OnInit, OnDestroy {

    electronicsInfo: ElectronicsInfo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private electronicsInfoService: ElectronicsInfoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInElectronicsInfos();
    }

    load(id) {
        this.electronicsInfoService.find(id)
            .subscribe((electronicsInfoResponse: HttpResponse<ElectronicsInfo>) => {
                this.electronicsInfo = electronicsInfoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInElectronicsInfos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'electronicsInfoListModification',
            (response) => this.load(this.electronicsInfo.id)
        );
    }
}
