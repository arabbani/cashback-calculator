import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrDialogService } from '../../apsstr-core-ui';
import { GRID_STATE } from '../../shared';
import { RechargePlanType } from './recharge-plan-type.model';
import { RechargePlanTypeService } from './recharge-plan-type.service';

@Component({
    selector: 'apsstr-recharge-plan-type',
    templateUrl: './recharge-plan-type.component.html'
})
export class RechargePlanTypeComponent implements OnInit {

    public rechargePlanTypes: RechargePlanType[];
    public gridState: State;
    rechargePlanTypeFormGroup: FormGroup;

    constructor(private rechargePlanTypeService: RechargePlanTypeService, private formBuilder: FormBuilder,
        private apsstrDialogService: ApsstrDialogService) {
        this.createRechargePlanTypeFormGroup = this.createRechargePlanTypeFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllRechargePlanType();
    }

    private loadAllRechargePlanType() {
        this.rechargePlanTypeService.findAll().subscribe(
            (res: HttpResponse<RechargePlanType[]>) => {
                this.rechargePlanTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createRechargePlanTypeFormGroup(args: any): FormGroup {
        const item = args.isNew ? new RechargePlanType() : args.dataItem;
        this.rechargePlanTypeFormGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required],
            'dataPlan': item.dataPlan
        });
        return this.rechargePlanTypeFormGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.rechargePlanTypeService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.rechargePlanTypeService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.rechargePlanTypes.push(dataItem);
                this.rechargePlanTypes = _.sortBy(this.rechargePlanTypes, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.rechargePlanTypeService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllRechargePlanType();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RechargePlanType>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<RechargePlanType>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RechargePlanType, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllRechargePlanType();
        }
    }

    private onSaveError() {
        this.loadAllRechargePlanType();
    }

    private onError(error) {
        console.log('ERROR');
    }
}
