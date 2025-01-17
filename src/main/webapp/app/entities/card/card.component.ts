import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrDialogService } from '../../apsstr-core-ui';
import { GRID_STATE } from '../../shared';
import { Bank, BankService } from '../bank';
import { CardProvider, CardProviderService } from '../card-provider';
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
    cardProviders: CardProvider[];

    constructor(private cardService: CardService, private formBuilder: FormBuilder,
        private apsstrDialogService: ApsstrDialogService, private cardTypeService: CardTypeService, private bankService: BankService,
        private cardProviderService: CardProviderService) {
        this.createCardFormGroup = this.createCardFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllCardsTypes();
        this.loadAllBanks();
        this.loadAllCards();
        this.loadAllCardsProviders();
    }

    private loadAllCardsTypes() {
        this.cardTypeService.findAll().subscribe(
            (res: HttpResponse<CardType[]>) => {
                this.cardTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private loadAllBanks() {
        this.bankService.findAll().subscribe(
            (res: HttpResponse<Bank[]>) => {
                this.banks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private loadAllCards() {
        this.cardService.findWithTypeAndBankAndProviders().subscribe(
            (res: HttpResponse<Card[]>) => {
                this.cards = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private loadAllCardsProviders() {
        this.cardProviderService.findAll().subscribe(
            (res: HttpResponse<CardProvider[]>) => {
                this.cardProviders = res.body;
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
            'cardProviders': item.cardProviders,
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
        this.apsstrDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.cards.push(dataItem);
                this.cards = _.sortBy(this.cards, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.cardService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllCards();
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
            this.loadAllCards();
        }
    }

    private onSaveError() {
        this.loadAllCards();
    }

    private onError(error) {
        console.log('ERROR');
    }

    public constructCardProviderNames(cardProviders: CardProvider[]): string {
        let cardProvidersName = '';
        if (cardProviders) {
            const length = cardProviders.length;
            _.forEach(cardProviders, function(value, index) {
                cardProvidersName += value.name;
                if (index < length - 1) {
                    cardProvidersName += ', ';
                }
            });
        }
        return cardProvidersName;
    }

}
