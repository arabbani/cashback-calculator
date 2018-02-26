import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrKendoDialogService } from '../../apsstr-core-ui/apsstr-core/services';
import { GRID_STATE } from '../../shared';
import { ReturnType } from './return-type.model';
import { ReturnTypeService } from './return-type.service';

@Component({
    selector: 'apsstr-return-type',
    templateUrl: './return-type.component.html'
})
export class ReturnTypeComponent implements OnInit {

    public returnTypes: ReturnType[];
    public gridState: State;
    returnTypeFormGroup: FormGroup;

    constructor(private returnTypeService: ReturnTypeService, private formBuilder: FormBuilder,
        private apsstrKendoDialogService: ApsstrKendoDialogService) {
        this.createReturnTypeFormGroup = this.createReturnTypeFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllReturnType();
    }

    private loadAllReturnType() {
        this.returnTypeService.query().subscribe(
            (res: HttpResponse<ReturnType[]>) => {
                this.returnTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createReturnTypeFormGroup(args: any): FormGroup {
        const item = args.isNew ? new ReturnType() : args.dataItem;
        this.returnTypeFormGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required]
        });
        return this.returnTypeFormGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.returnTypeService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.returnTypeService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrKendoDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.returnTypes.push(dataItem);
                this.returnTypes = _.sortBy(this.returnTypes, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.returnTypeService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllReturnType();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ReturnType>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<ReturnType>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ReturnType, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllReturnType();
        }
    }

    private onSaveError() {
        this.loadAllReturnType();
    }

    private onError(error) {
        console.log('ERROR');
    }
}
