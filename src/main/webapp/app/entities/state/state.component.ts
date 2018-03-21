import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State as GridState } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrDialogService } from '../../apsstr-core-ui/apsstr-core/services';
import { GRID_STATE } from '../../shared';
import { State } from './state.model';
import { StateService } from './state.service';

@Component({
    selector: 'apsstr-state',
    templateUrl: './state.component.html'
})
export class StateComponent implements OnInit {

    public states: State[];
    public gridState: GridState;
    stateFormGroup: FormGroup;

    constructor(private stateService: StateService, private formBuilder: FormBuilder,
        private apsstrKendoDialogService: ApsstrDialogService) {
        this.createStateFormGroup = this.createStateFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllState();
    }

    private loadAllState() {
        this.stateService.query().subscribe(
            (res: HttpResponse<State[]>) => {
                this.states = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createStateFormGroup(args: any): FormGroup {
        const item = args.isNew ? new State() : args.dataItem;
        this.stateFormGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required]
        });
        return this.stateFormGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.stateService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.stateService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrKendoDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.states.push(dataItem);
                this.states = _.sortBy(this.states, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.stateService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllState();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<State>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<State>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: State, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllState();
        }
    }

    private onSaveError() {
        this.loadAllState();
    }

    private onError(error) {
        console.log('ERROR');
    }
}
