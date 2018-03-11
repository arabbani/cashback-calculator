import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrDialogService } from '../../apsstr-core-ui/apsstr-core/services';
import { GRID_STATE } from '../../shared';
import { ReechargePlanType } from './reecharge-plan-type.model';
import { ReechargePlanTypeService } from './reecharge-plan-type.service';

@Component({
    selector: 'apsstr-reecharge-plan-type',
    templateUrl: './reecharge-plan-type.component.html'
})
export class ReechargePlanTypeComponent implements OnInit {

    public reechargePlanTypes: ReechargePlanType[];
    public gridState: State;
    reechargePlanTypeFormGroup: FormGroup;

    constructor(private reechargePlanTypeService: ReechargePlanTypeService, private formBuilder: FormBuilder,
        private apsstrKendoDialogService: ApsstrDialogService) {
        this.createReechargePlanTypeFormGroup = this.createReechargePlanTypeFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllReechargePlanType();
    }

    private loadAllReechargePlanType() {
        this.reechargePlanTypeService.query().subscribe(
            (res: HttpResponse<ReechargePlanType[]>) => {
                this.reechargePlanTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createReechargePlanTypeFormGroup(args: any): FormGroup {
        const item = args.isNew ? new ReechargePlanType() : args.dataItem;
        this.reechargePlanTypeFormGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required]
        });
        return this.reechargePlanTypeFormGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.reechargePlanTypeService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.reechargePlanTypeService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrKendoDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.reechargePlanTypes.push(dataItem);
                this.reechargePlanTypes = _.sortBy(this.reechargePlanTypes, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.reechargePlanTypeService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllReechargePlanType();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ReechargePlanType>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<ReechargePlanType>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ReechargePlanType, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllReechargePlanType();
        }
    }

    private onSaveError() {
        this.loadAllReechargePlanType();
    }

    private onError(error) {
        console.log('ERROR');
    }
}
