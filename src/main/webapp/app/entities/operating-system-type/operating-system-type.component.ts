import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrDialogService } from '../../apsstr-core-ui/apsstr-core/services';
import { GRID_STATE } from '../../shared';
import { OperatingSystemType } from './operating-system-type.model';
import { OperatingSystemTypeService } from './operating-system-type.service';

@Component({
    selector: 'apsstr-operating-system-type',
    templateUrl: './operating-system-type.component.html'
})
export class OperatingSystemTypeComponent implements OnInit {

    public operatingSystemTypes: OperatingSystemType[];
    public gridState: State;
    operatingSystemTypeFormGroup: FormGroup;

    constructor(private operatingSystemTypeService: OperatingSystemTypeService, private formBuilder: FormBuilder,
        private apsstrKendoDialogService: ApsstrDialogService) {
        this.createOperatingSystemTypeFormGroup = this.createOperatingSystemTypeFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllOperatingSystemType();
    }

    private loadAllOperatingSystemType() {
        this.operatingSystemTypeService.query().subscribe(
            (res: HttpResponse<OperatingSystemType[]>) => {
                this.operatingSystemTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createOperatingSystemTypeFormGroup(args: any): FormGroup {
        const item = args.isNew ? new OperatingSystemType() : args.dataItem;
        this.operatingSystemTypeFormGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required]
        });
        return this.operatingSystemTypeFormGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.operatingSystemTypeService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.operatingSystemTypeService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrKendoDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.operatingSystemTypes.push(dataItem);
                this.operatingSystemTypes = _.sortBy(this.operatingSystemTypes, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.operatingSystemTypeService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllOperatingSystemType();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OperatingSystemType>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<OperatingSystemType>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OperatingSystemType, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllOperatingSystemType();
        }
    }

    private onSaveError() {
        this.loadAllOperatingSystemType();
    }

    private onError(error) {
        console.log('ERROR');
    }
}
