import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CardProvider } from './card-provider.model';
import { CardProviderPopupService } from './card-provider-popup.service';
import { CardProviderService } from './card-provider.service';

@Component({
    selector: 'apsstr-card-provider-dialog',
    templateUrl: './card-provider-dialog.component.html'
})
export class CardProviderDialogComponent implements OnInit {

    cardProvider: CardProvider;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private cardProviderService: CardProviderService,
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
        if (this.cardProvider.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cardProviderService.update(this.cardProvider));
        } else {
            this.subscribeToSaveResponse(
                this.cardProviderService.create(this.cardProvider));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CardProvider>>) {
        result.subscribe((res: HttpResponse<CardProvider>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CardProvider) {
        this.eventManager.broadcast({ name: 'cardProviderListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'apsstr-card-provider-popup',
    template: ''
})
export class CardProviderPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cardProviderPopupService: CardProviderPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cardProviderPopupService
                    .open(CardProviderDialogComponent as Component, params['id']);
            } else {
                this.cardProviderPopupService
                    .open(CardProviderDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
