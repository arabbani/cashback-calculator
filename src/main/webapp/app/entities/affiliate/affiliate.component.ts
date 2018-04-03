import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrDialogService } from '../../apsstr-core-ui';
import { GRID_STATE } from '../../shared';
import { Affiliate } from './affiliate.model';
import { AffiliateService } from './affiliate.service';

@Component({
    selector: 'apsstr-affiliate',
    templateUrl: './affiliate.component.html'
})
export class AffiliateComponent implements OnInit {

    public affiliates: Affiliate[];
    public gridState: State;
    affiliateFormGroup: FormGroup;

    constructor(private affiliateService: AffiliateService, private formBuilder: FormBuilder,
        private apsstrDialogService: ApsstrDialogService) {
        this.createAffiliateFormGroup = this.createAffiliateFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllAffiliate();
    }

    private loadAllAffiliate() {
        this.affiliateService.query().subscribe(
            (res: HttpResponse<Affiliate[]>) => {
                this.affiliates = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createAffiliateFormGroup(args: any): FormGroup {
        const item = args.isNew ? new Affiliate() : args.dataItem;
        this.affiliateFormGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required],
            'active': item.active,
            'url': item.url
        });
        return this.affiliateFormGroup;
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
        this.apsstrDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.affiliates.push(dataItem);
                this.affiliates = _.sortBy(this.affiliates, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.affiliateService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllAffiliate();
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
            this.loadAllAffiliate();
        }
    }

    private onSaveError() {
        this.loadAllAffiliate();
    }

    private onError(error) {
        console.log('ERROR');
    }

}
