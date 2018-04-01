import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrDialogService } from '../../apsstr-core-ui/apsstr-core/services';
import { GRID_STATE } from '../../shared';
import { FlightClass } from './flight-class.model';
import { FlightClassService } from './flight-class.service';

@Component({
    selector: 'apsstr-flight-class',
    templateUrl: './flight-class.component.html'
})
export class FlightClassComponent implements OnInit {

    public flightClasses: FlightClass[];
    public gridState: State;
    flightClassFormGroup: FormGroup;

    constructor(private flightClassService: FlightClassService, private formBuilder: FormBuilder,
        private apsstrKendoDialogService: ApsstrDialogService) {
        this.createFlightClassFormGroup = this.createFlightClassFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllFlightClass();
    }

    private loadAllFlightClass() {
        this.flightClassService.findAll().subscribe(
            (res: HttpResponse<FlightClass[]>) => {
                this.flightClasses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createFlightClassFormGroup(args: any): FormGroup {
        const item = args.isNew ? new FlightClass() : args.dataItem;
        this.flightClassFormGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required]
        });
        return this.flightClassFormGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.flightClassService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.flightClassService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrKendoDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.flightClasses.push(dataItem);
                this.flightClasses = _.sortBy(this.flightClasses, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.flightClassService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllFlightClass();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FlightClass>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<FlightClass>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FlightClass, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllFlightClass();
        }
    }

    private onSaveError() {
        this.loadAllFlightClass();
    }

    private onError(error) {
        console.log('ERROR');
    }
}
