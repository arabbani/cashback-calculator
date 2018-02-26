import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrKendoDialogService } from '../../apsstr-core-ui/apsstr-core/services';
import { GRID_STATE } from '../../shared';
import { Region } from './region.model';
import { RegionService } from './region.service';

@Component({
    selector: 'apsstr-region',
    templateUrl: './region.component.html'
})
export class RegionComponent implements OnInit {

    public regions: Region[];
    public gridState: State;
    returnModeFormGroup: FormGroup;

    constructor(private regionService: RegionService, private formBuilder: FormBuilder,
        private apsstrKendoDialogService: ApsstrKendoDialogService) {
        this.createRegionFormGroup = this.createRegionFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllRegion();
    }

    private loadAllRegion() {
        this.regionService.query().subscribe(
            (res: HttpResponse<Region[]>) => {
                this.regions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createRegionFormGroup(args: any): FormGroup {
        const item = args.isNew ? new Region() : args.dataItem;
        this.returnModeFormGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required]
        });
        return this.returnModeFormGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.regionService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.regionService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrKendoDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.regions.push(dataItem);
                this.regions = _.sortBy(this.regions, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.regionService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllRegion();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Region>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<Region>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Region, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllRegion();
        }
    }

    private onSaveError() {
        this.loadAllRegion();
    }

    private onError(error) {
        console.log('ERROR');
    }
}
