import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrDialogService } from '../../apsstr-core-ui/apsstr-core/services';
import { GRID_STATE } from '../../shared';
import { CardProvider } from './card-provider.model';
import { CardProviderService } from './card-provider.service';

@Component({
    selector: 'apsstr-card-provider',
    templateUrl: './card-provider.component.html'
})
export class CardProviderComponent implements OnInit {

    public cardProviders: CardProvider[];
    public gridState: State;
    cardProviderFormGroup: FormGroup;

    constructor(private cardProviderService: CardProviderService, private formBuilder: FormBuilder,
        private apsstrKendoDialogService: ApsstrDialogService) {
        this.createCardProviderFormGroup = this.createCardProviderFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllCardProviders();
    }

    private loadAllCardProviders() {
        this.cardProviderService.query().subscribe(
            (res: HttpResponse<CardProvider[]>) => {
                this.cardProviders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createCardProviderFormGroup(args: any): FormGroup {
        const item = args.isNew ? new CardProvider() : args.dataItem;
        this.cardProviderFormGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required]
        });
        return this.cardProviderFormGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.cardProviderService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.cardProviderService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrKendoDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.cardProviders.push(dataItem);
                this.cardProviders = _.sortBy(this.cardProviders, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.cardProviderService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllCardProviders();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CardProvider>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<CardProvider>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CardProvider, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllCardProviders();
        }
    }

    private onSaveError() {
        this.loadAllCardProviders();
    }

    private onError(error) {
        console.log('ERROR');
    }

}
