import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrDialogService } from '../../apsstr-core-ui';
import { GRID_STATE } from '../../shared';
import { OfferType } from './offer-type.model';
import { OfferTypeService } from './offer-type.service';

@Component({
    selector: 'apsstr-offer-type',
    templateUrl: './offer-type.component.html'
})
export class OfferTypeComponent implements OnInit {

    public offerTypes: OfferType[];
    public gridState: State;
    offerPolicyFormGroup: FormGroup;

    constructor(private offerTypeService: OfferTypeService, private formBuilder: FormBuilder,
        private apsstrDialogService: ApsstrDialogService) {
        this.createOfferTypeFormGroup = this.createOfferTypeFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllOfferType();
    }

    private loadAllOfferType() {
        this.offerTypeService.findAll().subscribe(
            (res: HttpResponse<OfferType[]>) => {
                this.offerTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createOfferTypeFormGroup(args: any): FormGroup {
        const item = args.isNew ? new OfferType() : args.dataItem;
        this.offerPolicyFormGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required]
        });
        return this.offerPolicyFormGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.offerTypeService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.offerTypeService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.offerTypes.push(dataItem);
                this.offerTypes = _.sortBy(this.offerTypes, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.offerTypeService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllOfferType();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OfferType>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<OfferType>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OfferType, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllOfferType();
        }
    }

    private onSaveError() {
        this.loadAllOfferType();
    }

    private onError(error) {
        console.log('ERROR');
    }
}
