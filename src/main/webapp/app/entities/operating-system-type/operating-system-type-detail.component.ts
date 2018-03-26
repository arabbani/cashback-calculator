import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OperatingSystemType } from './operating-system-type.model';
import { OperatingSystemTypeService } from './operating-system-type.service';

@Component({
    selector: 'apsstr-operating-system-type-detail',
    templateUrl: './operating-system-type-detail.component.html'
})
export class OperatingSystemTypeDetailComponent implements OnInit, OnDestroy {

    operatingSystemType: OperatingSystemType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private operatingSystemTypeService: OperatingSystemTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOperatingSystemTypes();
    }

    load(id) {
        this.operatingSystemTypeService.find(id)
            .subscribe((operatingSystemTypeResponse: HttpResponse<OperatingSystemType>) => {
                this.operatingSystemType = operatingSystemTypeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOperatingSystemTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'operatingSystemTypeListModification',
            (response) => this.load(this.operatingSystemType.id)
        );
    }
}
