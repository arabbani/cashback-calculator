import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State as GridState } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrDialogService } from '../../apsstr-core-ui/apsstr-core/services';
import { GRID_STATE } from '../../shared';
import { State, StateService } from '../state';
import { City } from './city.model';
import { CityService } from './city.service';

@Component({
    selector: 'apsstr-city',
    templateUrl: './city.component.html'
})
export class CityComponent implements OnInit {

    public cities: City[];
    public gridState: GridState;
    cityFormGroup: FormGroup;
    states: State[];

    constructor(private cityService: CityService, private formBuilder: FormBuilder,
        private apsstrKendoDialogService: ApsstrDialogService, private stateService: StateService) {
        this.createCityFormGroup = this.createCityFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllStates();
        this.loadAllCity();
    }

    private loadAllStates() {
        this.stateService.query().subscribe(
            (res: HttpResponse<State[]>) => {
                this.states = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private loadAllCity() {
        this.cityService.findAllWithState().subscribe(
            (res: HttpResponse<City[]>) => {
                this.cities = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createCityFormGroup(args: any): FormGroup {
        const item = args.isNew ? new City() : args.dataItem;
        this.cityFormGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required],
            'state': [item.state, Validators.required]
        });
        return this.cityFormGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.cityService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.cityService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrKendoDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.cities.push(dataItem);
                this.cities = _.sortBy(this.cities, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.cityService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllCity();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<City>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<City>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: City, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllCity();
        }
    }

    private onSaveError() {
        this.loadAllCity();
    }

    private onError(error) {
        console.log('ERROR');
    }
}
