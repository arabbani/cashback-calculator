import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrDialogService } from '../../apsstr-core-ui/apsstr-core/services';
import { GRID_STATE } from '../../shared';
import { Bank, BankService } from '../bank';
import { CardType, CardTypeService } from '../card-type';
import { Card } from './card.model';
import { CardService } from './card.service';

@Component({
    selector: 'apsstr-card',
    templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {

    public cards: Card[];
    public gridState: State;
    bankFormGroup: FormGroup;
    cardTypes: CardType[];
    banks: Bank[];

    constructor(private cardService: CardService, private formBuilder: FormBuilder,
        private apsstrKendoDialogService: ApsstrDialogService, private cardTypeService: CardTypeService, private bankService: BankService) {
        this.createCardFormGroup = this.createCardFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllCardTypes();
        this.loadAllBanks();
        this.loadAllCard();
    }

    private loadAllCardTypes() {
        this.cardTypeService.query().subscribe(
            (res: HttpResponse<CardType[]>) => {
                this.cardTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private loadAllBanks() {
        this.bankService.query().subscribe(
            (res: HttpResponse<Bank[]>) => {
                this.banks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private loadAllCard() {
        this.cardService.query().subscribe(
            (res: HttpResponse<Card[]>) => {
                this.cards = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createCardFormGroup(args: any): FormGroup {
        const item = args.isNew ? new Card() : args.dataItem;
        this.bankFormGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required],
            'type': [item.type, Validators.required],
            'bank': [item.bank, Validators.required]
        });
        return this.bankFormGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.cardService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.cardService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrKendoDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.cards.push(dataItem);
                this.cards = _.sortBy(this.cards, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.cardService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllCard();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Card>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<Card>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Card, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllCard();
        }
    }

    private onSaveError() {
        this.loadAllCard();
    }

    private onError(error) {
        console.log('ERROR');
    }
}
