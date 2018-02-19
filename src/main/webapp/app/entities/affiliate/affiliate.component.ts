import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import { JhiAlertService } from 'ng-jhipster';

import { ITEMS_PER_PAGE } from '../../shared';
import { Affiliate } from './affiliate.model';
import { AffiliateService } from './affiliate.service';

@Component({
    selector: 'apsstr-affiliate',
    templateUrl: './affiliate.component.html'
})
export class AffiliateComponent implements OnInit {

    public affiliates: Affiliate[];
    public gridState: State = {
        skip: 0,
        take: ITEMS_PER_PAGE
    };

    formGroup: FormGroup;

    constructor(private affiliateService: AffiliateService, private jhiAlertService: JhiAlertService, private formBuilder: FormBuilder) {
        this.createFormGroup = this.createFormGroup.bind(this);
    }

    ngOnInit() {
        this.loadAll();
    }

    private loadAll() {
        this.affiliateService.query().subscribe(
            (res: HttpResponse < Affiliate[] > ) => {
                this.affiliates = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    public createFormGroup(args: any): FormGroup {
        const item = args.isNew ? new Affiliate() : args.dataItem;

        this.formGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required],
            'active': item.active,
            'url': item.url
            // [item.url, Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])]
        });

        return this.formGroup;
    }

    deleteItem(dataItem: any): void {
        this.affiliateService.delete(dataItem.id);
    }

    // affiliates: Affiliate[];
    //     currentAccount: any;
    //     eventSubscriber: Subscription;

    //     constructor(
    //         private affiliateService: AffiliateService,
    //         private jhiAlertService: JhiAlertService,
    //         private eventManager: JhiEventManager,
    //         private principal: Principal
    //     ) {
    //     }

    //     loadAll() {
    //         this.affiliateService.query().subscribe(
    //             (res: HttpResponse<Affiliate[]>) => {
    //                 this.affiliates = res.body;
    //             },
    //             (res: HttpErrorResponse) => this.onError(res.message)
    //         );
    //     }
    //     ngOnInit() {
    //         this.loadAll();
    //         this.principal.identity().then((account) => {
    //             this.currentAccount = account;
    //         });
    //         this.registerChangeInAffiliates();
    //     }

    //     ngOnDestroy() {
    //         this.eventManager.destroy(this.eventSubscriber);
    //     }

    //     trackId(index: number, item: Affiliate) {
    //         return item.id;
    //     }
    //     registerChangeInAffiliates() {
    //         this.eventSubscriber = this.eventManager.subscribe('affiliateListModification', (response) => this.loadAll());
    //     }

    //     private onError(error) {
    //         this.jhiAlertService.error(error.message, null, null);
    //     }
}
