import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ReturnType } from './return-type.model';
import { ReturnTypeService } from './return-type.service';

@Component({
    selector: 'apsstr-return-type-detail',
    templateUrl: './return-type-detail.component.html'
})
export class ReturnTypeDetailComponent implements OnInit, OnDestroy {

    returnType: ReturnType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private returnTypeService: ReturnTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInReturnTypes();
    }

    load(id) {
        this.returnTypeService.find(id)
            .subscribe((returnTypeResponse: HttpResponse<ReturnType>) => {
                this.returnType = returnTypeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInReturnTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'returnTypeListModification',
            (response) => this.load(this.returnType.id)
        );
    }
}
