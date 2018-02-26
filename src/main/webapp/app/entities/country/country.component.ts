import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrKendoDialogService } from '../../apsstr-core-ui/apsstr-core/services';
import { GRID_STATE } from '../../shared';
import { Country } from './country.model';
import { CountryService } from './country.service';

@Component({
    selector: 'apsstr-country',
    templateUrl: './country.component.html'
})
export class CountryComponent implements OnInit {

    public countries: Country[];
    public gridState: State;
    countryFormGroup: FormGroup;

    constructor(private countryService: CountryService, private formBuilder: FormBuilder,
        private apsstrKendoDialogService: ApsstrKendoDialogService) {
        this.createCountryFormGroup = this.createCountryFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllCountry();
    }

    private loadAllCountry() {
        this.countryService.query().subscribe(
            (res: HttpResponse<Country[]>) => {
                this.countries = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createCountryFormGroup(args: any): FormGroup {
        const item = args.isNew ? new Country() : args.dataItem;
        this.countryFormGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required]
        });
        return this.countryFormGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.countryService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.countryService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrKendoDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.countries.push(dataItem);
                this.countries = _.sortBy(this.countries, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.countryService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllCountry();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Country>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<Country>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Country, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllCountry();
        }
    }

    private onSaveError() {
        this.loadAllCountry();
    }

    private onError(error) {
        console.log('ERROR');
    }
}
