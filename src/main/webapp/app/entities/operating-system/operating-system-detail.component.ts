import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OperatingSystem } from './operating-system.model';
import { OperatingSystemService } from './operating-system.service';

@Component({
    selector: 'apsstr-operating-system-detail',
    templateUrl: './operating-system-detail.component.html'
})
export class OperatingSystemDetailComponent implements OnInit, OnDestroy {

    operatingSystem: OperatingSystem;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private operatingSystemService: OperatingSystemService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOperatingSystems();
    }

    load(id) {
        this.operatingSystemService.find(id)
            .subscribe((operatingSystemResponse: HttpResponse<OperatingSystem>) => {
                this.operatingSystem = operatingSystemResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOperatingSystems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'operatingSystemListModification',
            (response) => this.load(this.operatingSystem.id)
        );
    }
}
