import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrDialogService } from '../../apsstr-core-ui/apsstr-core/services';
import { GRID_STATE } from '../../shared';
import { ReturnMode } from './return-mode.model';
import { ReturnModeService } from './return-mode.service';

@Component({
    selector: 'apsstr-return-mode',
    templateUrl: './return-mode.component.html'
})
export class ReturnModeComponent implements OnInit {

    public returnModes: ReturnMode[];
    public gridState: State;
    returnModeFormGroup: FormGroup;

    constructor(private returnModeService: ReturnModeService, private formBuilder: FormBuilder,
        private apsstrKendoDialogService: ApsstrDialogService) {
        this.createReturnModeFormGroup = this.createReturnModeFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllReturnMode();
    }

    private loadAllReturnMode() {
        this.returnModeService.findAll().subscribe(
            (res: HttpResponse<ReturnMode[]>) => {
                this.returnModes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createReturnModeFormGroup(args: any): FormGroup {
        const item = args.isNew ? new ReturnMode() : args.dataItem;
        this.returnModeFormGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required]
        });
        return this.returnModeFormGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.returnModeService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.returnModeService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrKendoDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.returnModes.push(dataItem);
                this.returnModes = _.sortBy(this.returnModes, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.returnModeService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllReturnMode();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ReturnMode>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<ReturnMode>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ReturnMode, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllReturnMode();
        }
    }

    private onSaveError() {
        this.loadAllReturnMode();
    }

    private onError(error) {
        console.log('ERROR');
    }
}
