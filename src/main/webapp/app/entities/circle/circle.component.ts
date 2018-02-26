import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrKendoDialogService } from '../../apsstr-core-ui/apsstr-core/services';
import { GRID_STATE } from '../../shared';
import { Circle } from './circle.model';
import { CircleService } from './circle.service';

@Component({
    selector: 'apsstr-circle',
    templateUrl: './circle.component.html'
})
export class CircleComponent implements OnInit {

    public circles: Circle[];
    public gridState: State;
    circleFormGroup: FormGroup;

    constructor(private circleService: CircleService, private formBuilder: FormBuilder,
        private apsstrKendoDialogService: ApsstrKendoDialogService) {
        this.createCircleFormGroup = this.createCircleFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllCircle();
    }

    private loadAllCircle() {
        this.circleService.query().subscribe(
            (res: HttpResponse<Circle[]>) => {
                this.circles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createCircleFormGroup(args: any): FormGroup {
        const item = args.isNew ? new Circle() : args.dataItem;
        this.circleFormGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required],
            'code': [item.code, Validators.required]
        });
        return this.circleFormGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.circleService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.circleService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrKendoDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.circles.push(dataItem);
                this.circles = _.sortBy(this.circles, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.circleService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllCircle();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Circle>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<Circle>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Circle, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllCircle();
        }
    }

    private onSaveError() {
        this.loadAllCircle();
    }

    private onError(error) {
        console.log('ERROR');
    }
}
