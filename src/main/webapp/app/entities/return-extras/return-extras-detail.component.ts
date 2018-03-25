import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ReturnExtras } from './return-extras.model';
import { ReturnExtrasService } from './return-extras.service';

@Component({
    selector: 'apsstr-return-extras-detail',
    templateUrl: './return-extras-detail.component.html'
})
export class ReturnExtrasDetailComponent implements OnInit, OnDestroy {

    returnExtras: ReturnExtras;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private returnExtrasService: ReturnExtrasService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInReturnExtras();
    }

    load(id) {
        this.returnExtrasService.find(id)
            .subscribe((returnExtrasResponse: HttpResponse<ReturnExtras>) => {
                this.returnExtras = returnExtrasResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInReturnExtras() {
        this.eventSubscriber = this.eventManager.subscribe(
            'returnExtrasListModification',
            (response) => this.load(this.returnExtras.id)
        );
    }
}
