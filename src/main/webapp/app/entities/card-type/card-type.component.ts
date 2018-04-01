import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrDialogService } from '../../apsstr-core-ui/apsstr-core/services';
import { GRID_STATE } from '../../shared';
import { CardType } from './card-type.model';
import { CardTypeService } from './card-type.service';

@Component({
    selector: 'apsstr-card-type',
    templateUrl: './card-type.component.html'
})
export class CardTypeComponent implements OnInit {

    public cardTypes: CardType[];
    public gridState: State;
    cardTypeFormGroup: FormGroup;

    constructor(private cardTypeService: CardTypeService, private formBuilder: FormBuilder,
        private apsstrKendoDialogService: ApsstrDialogService) {
        this.createCardTypeFormGroup = this.createCardTypeFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllCardType();
    }

    private loadAllCardType() {
        this.cardTypeService.findAll().subscribe(
            (res: HttpResponse<CardType[]>) => {
                this.cardTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createCardTypeFormGroup(args: any): FormGroup {
        const item = args.isNew ? new CardType() : args.dataItem;
        this.cardTypeFormGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required]
        });
        return this.cardTypeFormGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.cardTypeService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.cardTypeService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrKendoDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.cardTypes.push(dataItem);
                this.cardTypes = _.sortBy(this.cardTypes, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.cardTypeService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllCardType();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CardType>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<CardType>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CardType, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllCardType();
        }
    }

    private onSaveError() {
        this.loadAllCardType();
    }

    private onError(error) {
        console.log('ERROR');
    }

}
