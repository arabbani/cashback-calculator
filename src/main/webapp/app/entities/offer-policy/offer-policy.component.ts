import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrKendoDialogService } from '../../apsstr-core-ui/apsstr-core/services';
import { GRID_STATE } from '../../shared';
import { OfferPolicy } from './offer-policy.model';
import { OfferPolicyService } from './offer-policy.service';

@Component({
    selector: 'apsstr-offer-policy',
    templateUrl: './offer-policy.component.html'
})
export class OfferPolicyComponent implements OnInit {

    public offerPolicies: OfferPolicy[];
    public gridState: State;
    offerPolicyFormGroup: FormGroup;

    constructor(private offerPolicyService: OfferPolicyService, private formBuilder: FormBuilder,
        private apsstrKendoDialogService: ApsstrKendoDialogService) {
        this.createOfferPolicyFormGroup = this.createOfferPolicyFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllOfferPolicy();
    }

    private loadAllOfferPolicy() {
        this.offerPolicyService.query().subscribe(
            (res: HttpResponse<OfferPolicy[]>) => {
                this.offerPolicies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createOfferPolicyFormGroup(args: any): FormGroup {
        const item = args.isNew ? new OfferPolicy() : args.dataItem;
        this.offerPolicyFormGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required],
            'description': [item.description, Validators.required]
        });
        return this.offerPolicyFormGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.offerPolicyService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.offerPolicyService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrKendoDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.offerPolicies.push(dataItem);
                this.offerPolicies = _.sortBy(this.offerPolicies, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.offerPolicyService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllOfferPolicy();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OfferPolicy>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<OfferPolicy>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OfferPolicy, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllOfferPolicy();
        }
    }

    private onSaveError() {
        this.loadAllOfferPolicy();
    }

    private onError(error) {
        console.log('ERROR');
    }
}
