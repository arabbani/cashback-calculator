import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ReturnMode } from './return-mode.model';
import { ReturnModeService } from './return-mode.service';

@Component({
    selector: 'apsstr-return-mode-detail',
    templateUrl: './return-mode-detail.component.html'
})
export class ReturnModeDetailComponent implements OnInit, OnDestroy {

    returnMode: ReturnMode;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private returnModeService: ReturnModeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInReturnModes();
    }

    load(id) {
        this.returnModeService.find(id)
            .subscribe((returnModeResponse: HttpResponse<ReturnMode>) => {
                this.returnMode = returnModeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInReturnModes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'returnModeListModification',
            (response) => this.load(this.returnMode.id)
        );
    }
}
