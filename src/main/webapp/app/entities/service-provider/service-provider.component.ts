import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ServiceProvider } from './service-provider.model';
import { ServiceProviderService } from './service-provider.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-service-provider',
    templateUrl: './service-provider.component.html'
})
export class ServiceProviderComponent implements OnInit, OnDestroy {
serviceProviders: ServiceProvider[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private serviceProviderService: ServiceProviderService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.serviceProviderService.query().subscribe(
            (res: HttpResponse<ServiceProvider[]>) => {
                this.serviceProviders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInServiceProviders();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ServiceProvider) {
        return item.id;
    }
    registerChangeInServiceProviders() {
        this.eventSubscriber = this.eventManager.subscribe('serviceProviderListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
