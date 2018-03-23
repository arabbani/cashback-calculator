import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrDialogService } from '../../apsstr-core-ui/apsstr-core/services';
import { GRID_STATE } from '../../shared';
import { Affiliate, AffiliateService } from '../affiliate';
import { AffiliateCredential } from './affiliate-credential.model';
import { AffiliateCredentialService } from './affiliate-credential.service';

@Component({
    selector: 'apsstr-affiliate-credential',
    templateUrl: './affiliate-credential.component.html'
})
export class AffiliateCredentialComponent implements OnInit {

    public affiliateCredentials: AffiliateCredential[];
    public gridState: State;
    affiliateCredentialFormGroup: FormGroup;
    affiliates: Affiliate[];

    constructor(private affiliateCredentialService: AffiliateCredentialService, private formBuilder: FormBuilder,
        private apsstrKendoDialogService: ApsstrDialogService, private affiliateService: AffiliateService) {
        this.createAffiliateCredentialFormGroup = this.createAffiliateCredentialFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllAffiliates();
        this.loadAllAffiliateCredential();
    }

    private loadAllAffiliates() {
        this.affiliateService.query().subscribe(
            (res: HttpResponse<Affiliate[]>) => {
                this.affiliates = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private loadAllAffiliateCredential() {
        this.affiliateCredentialService.query().subscribe(
            (res: HttpResponse<AffiliateCredential[]>) => {
                this.affiliateCredentials = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createAffiliateCredentialFormGroup(args: any): FormGroup {
        const item = args.isNew ? new AffiliateCredential() : args.dataItem;
        this.affiliateCredentialFormGroup = this.formBuilder.group({
            'id': item.id,
            'trackingId': item.trackingId,
            'token': item.token,
            'apiKey': item.apiKey,
            'affiliate': [item.affiliate, Validators.required],
            'active': item.active
        });
        return this.affiliateCredentialFormGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.affiliateCredentialService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.affiliateCredentialService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrKendoDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.affiliateCredentials.push(dataItem);
                this.affiliateCredentials = _.sortBy(this.affiliateCredentials, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.affiliateCredentialService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllAffiliateCredential();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AffiliateCredential>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<AffiliateCredential>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AffiliateCredential, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllAffiliateCredential();
        }
    }

    private onSaveError() {
        this.loadAllAffiliateCredential();
    }

    private onError(error) {
        console.log('ERROR');
    }
}
