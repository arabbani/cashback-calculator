import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ServiceProvider } from './service-provider.model';
import { ServiceProviderService } from './service-provider.service';

@Component({
    selector: 'apsstr-service-provider-detail',
    templateUrl: './service-provider-detail.component.html'
})
export class ServiceProviderDetailComponent implements OnInit, OnDestroy {

    serviceProvider: ServiceProvider;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private serviceProviderService: ServiceProviderService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInServiceProviders();
    }

    load(id) {
        this.serviceProviderService.find(id)
            .subscribe((serviceProviderResponse: HttpResponse<ServiceProvider>) => {
                this.serviceProvider = serviceProviderResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInServiceProviders() {
        this.eventSubscriber = this.eventManager.subscribe(
            'serviceProviderListModification',
            (response) => this.load(this.serviceProvider.id)
        );
    }
}
