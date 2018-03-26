import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Brand } from './brand.model';
import { BrandService } from './brand.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-brand',
    templateUrl: './brand.component.html'
})
export class BrandComponent implements OnInit, OnDestroy {
brands: Brand[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private brandService: BrandService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.brandService.query().subscribe(
            (res: HttpResponse<Brand[]>) => {
                this.brands = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBrands();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Brand) {
        return item.id;
    }
    registerChangeInBrands() {
        this.eventSubscriber = this.eventManager.subscribe('brandListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
