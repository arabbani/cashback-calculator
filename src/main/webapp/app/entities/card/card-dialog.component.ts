import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Card } from './card.model';
import { CardPopupService } from './card-popup.service';
import { CardService } from './card.service';
import { CardType, CardTypeService } from '../card-type';
import { CardProvider, CardProviderService } from '../card-provider';
import { Bank, BankService } from '../bank';

@Component({
    selector: 'apsstr-card-dialog',
    templateUrl: './card-dialog.component.html'
})
export class CardDialogComponent implements OnInit {

    card: Card;
    isSaving: boolean;

    cardtypes: CardType[];

    cardproviders: CardProvider[];

    banks: Bank[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cardService: CardService,
        private cardTypeService: CardTypeService,
        private cardProviderService: CardProviderService,
        private bankService: BankService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cardTypeService.query()
            .subscribe((res: HttpResponse<CardType[]>) => { this.cardtypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cardProviderService.query()
            .subscribe((res: HttpResponse<CardProvider[]>) => { this.cardproviders = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.bankService.query()
            .subscribe((res: HttpResponse<Bank[]>) => { this.banks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.card.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cardService.update(this.card));
        } else {
            this.subscribeToSaveResponse(
                this.cardService.create(this.card));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Card>>) {
        result.subscribe((res: HttpResponse<Card>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Card) {
        this.eventManager.broadcast({ name: 'cardListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCardTypeById(index: number, item: CardType) {
        return item.id;
    }

    trackCardProviderById(index: number, item: CardProvider) {
        return item.id;
    }

    trackBankById(index: number, item: Bank) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'apsstr-card-popup',
    template: ''
})
export class CardPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cardPopupService: CardPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cardPopupService
                    .open(CardDialogComponent as Component, params['id']);
            } else {
                this.cardPopupService
                    .open(CardDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
