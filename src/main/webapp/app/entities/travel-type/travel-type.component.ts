import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrKendoDialogService } from '../../apsstr-core-ui/apsstr-core/services';
import { GRID_STATE } from '../../shared';
import { TravelType } from './travel-type.model';
import { TravelTypeService } from './travel-type.service';

@Component({
    selector: 'apsstr-travel-type',
    templateUrl: './travel-type.component.html'
})
export class TravelTypeComponent implements OnInit {

    public travelTypes: TravelType[];
    public gridState: State;
    travelTypeFormGroup: FormGroup;

    constructor(private travelTypeService: TravelTypeService, private formBuilder: FormBuilder,
        private apsstrKendoDialogService: ApsstrKendoDialogService) {
        this.createTravelTypeFormGroup = this.createTravelTypeFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllTravelType();
    }

    private loadAllTravelType() {
        this.travelTypeService.query().subscribe(
            (res: HttpResponse<TravelType[]>) => {
                this.travelTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createTravelTypeFormGroup(args: any): FormGroup {
        const item = args.isNew ? new TravelType() : args.dataItem;
        this.travelTypeFormGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required]
        });
        return this.travelTypeFormGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.travelTypeService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.travelTypeService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrKendoDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.travelTypes.push(dataItem);
                this.travelTypes = _.sortBy(this.travelTypes, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.travelTypeService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllTravelType();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TravelType>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<TravelType>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TravelType, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllTravelType();
        }
    }

    private onSaveError() {
        this.loadAllTravelType();
    }

    private onError(error) {
        console.log('ERROR');
    }
}
