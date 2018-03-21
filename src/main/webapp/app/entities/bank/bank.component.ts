import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrDialogService } from '../../apsstr-core-ui/apsstr-core/services';
import { GRID_STATE } from '../../shared';
import { BankType, BankTypeService } from '../bank-type';
import { Bank } from './bank.model';
import { BankService } from './bank.service';

@Component({
    selector: 'apsstr-bank',
    templateUrl: './bank.component.html'
})
export class BankComponent implements OnInit {

    public banks: Bank[];
    public gridState: State;
    bankFormGroup: FormGroup;

    bankTypes: BankType[];
    defaultBankType = {id: null, name: 'Select Type'};

    constructor(private bankService: BankService, private formBuilder: FormBuilder,
        private apsstrKendoDialogService: ApsstrDialogService, private bankTypeService: BankTypeService) {
        this.createBankFormGroup = this.createBankFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllBankTypes();
        this.loadAllBank();
    }

    private loadAllBankTypes() {
        this.bankTypeService.query().subscribe(
            (res: HttpResponse<BankType[]>) => {
                this.bankTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private loadAllBank() {
        this.bankService.query().subscribe(
            (res: HttpResponse<Bank[]>) => {
                this.banks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createBankFormGroup(args: any): FormGroup {
        const item = args.isNew ? new Bank() : args.dataItem;
        this.bankFormGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required],
            'type': [item.type, Validators.required]
        });
        return this.bankFormGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.bankService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.bankService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrKendoDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.banks.push(dataItem);
                this.banks = _.sortBy(this.banks, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.bankService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllBank();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Bank>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<Bank>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Bank, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllBank();
        }
    }

    private onSaveError() {
        this.loadAllBank();
    }

    private onError(error) {
        console.log('ERROR');
    }
}
