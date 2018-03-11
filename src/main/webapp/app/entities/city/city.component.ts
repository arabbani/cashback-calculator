import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { City } from './city.model';
import { CityService } from './city.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-city',
    templateUrl: './city.component.html'
})
export class CityComponent implements OnInit, OnDestroy {
cities: City[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cityService: CityService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cityService.query().subscribe(
            (res: HttpResponse<City[]>) => {
                this.cities = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: City) {
        return item.id;
    }
    registerChangeInCities() {
        this.eventSubscriber = this.eventManager.subscribe('cityListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
