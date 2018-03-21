import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Date } from './date.model';
import { DatePopupService } from './date-popup.service';
import { DateService } from './date.service';

@Component({
    selector: 'apsstr-date-dialog',
    templateUrl: './date-dialog.component.html'
})
export class DateDialogComponent implements OnInit {

    date: Date;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dateService: DateService,
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
        if (this.date.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dateService.update(this.date));
        } else {
            this.subscribeToSaveResponse(
                this.dateService.create(this.date));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Date>>) {
        result.subscribe((res: HttpResponse<Date>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Date) {
        this.eventManager.broadcast({ name: 'dateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'apsstr-date-popup',
    template: ''
})
export class DatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private datePopupService: DatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.datePopupService
                    .open(DateDialogComponent as Component, params['id']);
            } else {
                this.datePopupService
                    .open(DateDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
