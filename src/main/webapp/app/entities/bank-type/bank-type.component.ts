import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrKendoDialogService } from '../../apsstr-core-ui/apsstr-core/services';
import { GRID_STATE } from '../../shared';
import { BankType } from './bank-type.model';
import { BankTypeService } from './bank-type.service';

@Component({
    selector: 'apsstr-bank-type',
    templateUrl: './bank-type.component.html'
})
export class BankTypeComponent implements OnInit {

    public bankTypes: BankType[];
    public gridState: State;
    bankTypeFormGroup: FormGroup;

    constructor(private affiliateService: BankTypeService, private formBuilder: FormBuilder,
        private apsstrKendoDialogService: ApsstrKendoDialogService) {
        this.createBankTypeFormGroup = this.createBankTypeFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllBankType();
    }

    private loadAllBankType() {
        this.affiliateService.query().subscribe(
            (res: HttpResponse<BankType[]>) => {
                this.bankTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createBankTypeFormGroup(args: any): FormGroup {
        const item = args.isNew ? new BankType() : args.dataItem;
        this.bankTypeFormGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required]
        });
        return this.bankTypeFormGroup;
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
                this.bankTypes.push(dataItem);
                this.bankTypes = _.sortBy(this.bankTypes, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.affiliateService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllBankType();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BankType>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<BankType>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BankType, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllBankType();
        }
    }

    private onSaveError() {
        this.loadAllBankType();
    }

    private onError(error) {
        console.log('ERROR');
    }

}
