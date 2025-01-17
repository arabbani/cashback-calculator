import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Day } from './day.model';
import { DayService } from './day.service';
import { Principal } from '../../shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrDialogService } from '../../apsstr-core-ui';
import { GRID_STATE } from '../../shared';

@Component({
    selector: 'apsstr-day',
    templateUrl: './day.component.html'
})
export class DayComponent implements OnInit {

    public days: Day[];
    public gridState: State;
    dayFormGroup: FormGroup;

    constructor(private dayService: DayService, private formBuilder: FormBuilder,
        private apsstrDialogService: ApsstrDialogService) {
        this.createDayFormGroup = this.createDayFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllDay();
    }

    private loadAllDay() {
        this.dayService.findAll().subscribe(
            (res: HttpResponse<Day[]>) => {
                this.days = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createDayFormGroup(args: any): FormGroup {
        const item = args.isNew ? new Day() : args.dataItem;
        this.dayFormGroup = this.formBuilder.group({
            'id': item.id,
            'day': [item.day, Validators.required]
        });
        return this.dayFormGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.dayService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.dayService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.days.push(dataItem);
                this.days = _.sortBy(this.days, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.dayService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllDay();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Day>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<Day>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Day, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllDay();
        }
    }

    private onSaveError() {
        this.loadAllDay();
    }

    private onError(error) {
        console.log('ERROR');
    }
}
