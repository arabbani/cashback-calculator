import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Day } from './day.model';
import { DayPopupService } from './day-popup.service';
import { DayService } from './day.service';

@Component({
    selector: 'apsstr-day-dialog',
    templateUrl: './day-dialog.component.html'
})
export class DayDialogComponent implements OnInit {

    day: Day;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dayService: DayService,
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
        if (this.day.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dayService.update(this.day));
        } else {
            this.subscribeToSaveResponse(
                this.dayService.create(this.day));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Day>>) {
        result.subscribe((res: HttpResponse<Day>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Day) {
        this.eventManager.broadcast({ name: 'dayListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'apsstr-day-popup',
    template: ''
})
export class DayPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dayPopupService: DayPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dayPopupService
                    .open(DayDialogComponent as Component, params['id']);
            } else {
                this.dayPopupService
                    .open(DayDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
