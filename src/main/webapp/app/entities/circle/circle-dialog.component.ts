import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Circle } from './circle.model';
import { CirclePopupService } from './circle-popup.service';
import { CircleService } from './circle.service';

@Component({
    selector: 'apsstr-circle-dialog',
    templateUrl: './circle-dialog.component.html'
})
export class CircleDialogComponent implements OnInit {

    circle: Circle;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private circleService: CircleService,
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
        if (this.circle.id !== undefined) {
            this.subscribeToSaveResponse(
                this.circleService.update(this.circle));
        } else {
            this.subscribeToSaveResponse(
                this.circleService.create(this.circle));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Circle>>) {
        result.subscribe((res: HttpResponse<Circle>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Circle) {
        this.eventManager.broadcast({ name: 'circleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'apsstr-circle-popup',
    template: ''
})
export class CirclePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private circlePopupService: CirclePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.circlePopupService
                    .open(CircleDialogComponent as Component, params['id']);
            } else {
                this.circlePopupService
                    .open(CircleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
