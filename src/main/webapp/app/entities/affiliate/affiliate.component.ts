import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { JhiAlertService } from 'ng-jhipster';
import { Observable } from 'rxjs/Observable';

import { ApsstrKendoDialogService } from '../../apsstr-core-ui/apsstr-core/services';
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

    constructor(private affiliateService: AffiliateService, private jhiAlertService: JhiAlertService, private formBuilder: FormBuilder,
        private apsstrKendoDialogService: ApsstrKendoDialogService) {
        this.createFormGroup = this.createFormGroup.bind(this);
    }

    ngOnInit() {
        this.loadAll();
    }

    private loadAll() {
        this.affiliateService.query().subscribe(
            (res: HttpResponse<Affiliate[]>) => {
                this.affiliates = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createFormGroup(args: any): FormGroup {
        const item = args.isNew ? new Affiliate() : args.dataItem;
        this.formGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required],
            'active': item.active,
            'url': item.url
        });
        return this.formGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.affiliateService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.affiliateService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrKendoDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.affiliates.push(dataItem);
                this.affiliates = _.sortBy(this.affiliates, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.affiliateService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAll();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Affiliate>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<Affiliate>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Affiliate, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAll();
        }
    }

    private onSaveError() {
        this.loadAll();
    }

    private onError(error) {
        console.log('ERROR');
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
