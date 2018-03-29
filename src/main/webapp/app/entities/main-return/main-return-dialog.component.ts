import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MainReturn } from './main-return.model';
import { MainReturnPopupService } from './main-return-popup.service';
import { MainReturnService } from './main-return.service';
import { ReturnMode, ReturnModeService } from '../return-mode';
import { Card, CardService } from '../card';

@Component({
    selector: 'apsstr-main-return-dialog',
    templateUrl: './main-return-dialog.component.html'
})
export class MainReturnDialogComponent implements OnInit {

    mainReturn: MainReturn;
    isSaving: boolean;

    returnmodes: ReturnMode[];

    cards: Card[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private mainReturnService: MainReturnService,
        private returnModeService: ReturnModeService,
        private cardService: CardService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.returnModeService.query()
            .subscribe((res: HttpResponse<ReturnMode[]>) => { this.returnmodes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cardService.query()
            .subscribe((res: HttpResponse<Card[]>) => { this.cards = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.mainReturn.id !== undefined) {
            this.subscribeToSaveResponse(
                this.mainReturnService.update(this.mainReturn));
        } else {
            this.subscribeToSaveResponse(
                this.mainReturnService.create(this.mainReturn));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MainReturn>>) {
        result.subscribe((res: HttpResponse<MainReturn>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MainReturn) {
        this.eventManager.broadcast({ name: 'mainReturnListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackReturnModeById(index: number, item: ReturnMode) {
        return item.id;
    }

    trackCardById(index: number, item: Card) {
        return item.id;
    }
}

@Component({
    selector: 'apsstr-main-return-popup',
    template: ''
})
export class MainReturnPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mainReturnPopupService: MainReturnPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.mainReturnPopupService
                    .open(MainReturnDialogComponent as Component, params['id']);
            } else {
                this.mainReturnPopupService
                    .open(MainReturnDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
