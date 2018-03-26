import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FlightClass } from './flight-class.model';
import { FlightClassPopupService } from './flight-class-popup.service';
import { FlightClassService } from './flight-class.service';

@Component({
    selector: 'apsstr-flight-class-dialog',
    templateUrl: './flight-class-dialog.component.html'
})
export class FlightClassDialogComponent implements OnInit {

    flightClass: FlightClass;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private flightClassService: FlightClassService,
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
        if (this.flightClass.id !== undefined) {
            this.subscribeToSaveResponse(
                this.flightClassService.update(this.flightClass));
        } else {
            this.subscribeToSaveResponse(
                this.flightClassService.create(this.flightClass));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FlightClass>>) {
        result.subscribe((res: HttpResponse<FlightClass>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FlightClass) {
        this.eventManager.broadcast({ name: 'flightClassListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'apsstr-flight-class-popup',
    template: ''
})
export class FlightClassPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private flightClassPopupService: FlightClassPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.flightClassPopupService
                    .open(FlightClassDialogComponent as Component, params['id']);
            } else {
                this.flightClassPopupService
                    .open(FlightClassDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
