import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrDialogService } from '../../apsstr-core-ui';
import { GRID_STATE } from '../../shared';
import { Date } from './date.model';
import { DateService } from './date.service';

@Component({
    selector: 'apsstr-date',
    templateUrl: './date.component.html'
})
export class DateComponent implements OnInit {

    public dates: Date[];
    public gridState: State;
    dateFormGroup: FormGroup;

    constructor(private dateService: DateService, private formBuilder: FormBuilder,
        private apsstrDialogService: ApsstrDialogService) {
        this.createDateFormGroup = this.createDateFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllDate();
    }

    private loadAllDate() {
        this.dateService.findAll().subscribe(
            (res: HttpResponse<Date[]>) => {
                this.dates = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createDateFormGroup(args: any): FormGroup {
        const item = args.isNew ? new Date() : args.dataItem;
        this.dateFormGroup = this.formBuilder.group({
            'id': item.id,
            'date': [item.date, Validators.required]
        });
        return this.dateFormGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.dateService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.dateService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.dates.push(dataItem);
                this.dates = _.sortBy(this.dates, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.dateService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllDate();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Date>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<Date>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Date, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllDate();
        }
    }

    private onSaveError() {
        this.loadAllDate();
    }

    private onError(error) {
        console.log('ERROR');
    }
}
