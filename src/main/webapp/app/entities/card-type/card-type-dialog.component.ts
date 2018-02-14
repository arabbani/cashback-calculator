import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CardType } from './card-type.model';
import { CardTypePopupService } from './card-type-popup.service';
import { CardTypeService } from './card-type.service';

@Component({
    selector: 'apsstr-card-type-dialog',
    templateUrl: './card-type-dialog.component.html'
})
export class CardTypeDialogComponent implements OnInit {

    cardType: CardType;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private cardTypeService: CardTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cardType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cardTypeService.update(this.cardType));
        } else {
            this.subscribeToSaveResponse(
                this.cardTypeService.create(this.cardType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CardType>>) {
        result.subscribe((res: HttpResponse<CardType>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CardType) {
        this.eventManager.broadcast({ name: 'cardTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'apsstr-card-type-popup',
    template: ''
})
export class CardTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cardTypePopupService: CardTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cardTypePopupService
                    .open(CardTypeDialogComponent as Component, params['id']);
            } else {
                this.cardTypePopupService
                    .open(CardTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
