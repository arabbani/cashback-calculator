import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrDialogService } from '../../apsstr-core-ui/apsstr-core/services';
import { GRID_STATE } from '../../shared';
import { OperatingSystemType, OperatingSystemTypeService } from '../operating-system-type';
import { OperatingSystem } from './operating-system.model';
import { OperatingSystemService } from './operating-system.service';

@Component({
    selector: 'apsstr-operating-system',
    templateUrl: './operating-system.component.html'
})
export class OperatingSystemComponent implements OnInit {

    public operatingSystems: OperatingSystem[];
    public gridState: State;
    operatingSystemFormGroup: FormGroup;

    operatingSystemTypes: OperatingSystemType[];
    defaultOperatingSystemType = {id: null, name: 'Select Type'};

    constructor(private operatingSystemService: OperatingSystemService, private formBuilder: FormBuilder,
        private apsstrKendoDialogService: ApsstrDialogService, private operatingSystemTypeService: OperatingSystemTypeService) {
        this.createOperatingSystemFormGroup = this.createOperatingSystemFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllOperatingSystemTypes();
        this.loadAllOperatingSystem();
    }

    private loadAllOperatingSystemTypes() {
        this.operatingSystemTypeService.query().subscribe(
            (res: HttpResponse<OperatingSystemType[]>) => {
                this.operatingSystemTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private loadAllOperatingSystem() {
        this.operatingSystemService.query().subscribe(
            (res: HttpResponse<OperatingSystem[]>) => {
                this.operatingSystems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createOperatingSystemFormGroup(args: any): FormGroup {
        const item = args.isNew ? new OperatingSystem() : args.dataItem;
        this.operatingSystemFormGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required],
            'type': [item.type, Validators.required]
        });
        return this.operatingSystemFormGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.operatingSystemService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.operatingSystemService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrKendoDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.operatingSystems.push(dataItem);
                this.operatingSystems = _.sortBy(this.operatingSystems, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.operatingSystemService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllOperatingSystem();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OperatingSystem>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<OperatingSystem>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OperatingSystem, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllOperatingSystem();
        }
    }

    private onSaveError() {
        this.loadAllOperatingSystem();
    }

    private onError(error) {
        console.log('ERROR');
    }
}
