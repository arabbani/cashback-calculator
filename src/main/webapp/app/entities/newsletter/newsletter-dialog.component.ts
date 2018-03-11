import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Newsletter } from './newsletter.model';
import { NewsletterPopupService } from './newsletter-popup.service';
import { NewsletterService } from './newsletter.service';

@Component({
    selector: 'apsstr-newsletter-dialog',
    templateUrl: './newsletter-dialog.component.html'
})
export class NewsletterDialogComponent implements OnInit {

    newsletter: Newsletter;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private newsletterService: NewsletterService,
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
        if (this.newsletter.id !== undefined) {
            this.subscribeToSaveResponse(
                this.newsletterService.update(this.newsletter));
        } else {
            this.subscribeToSaveResponse(
                this.newsletterService.create(this.newsletter));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Newsletter>>) {
        result.subscribe((res: HttpResponse<Newsletter>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Newsletter) {
        this.eventManager.broadcast({ name: 'newsletterListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'apsstr-newsletter-popup',
    template: ''
})
export class NewsletterPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private newsletterPopupService: NewsletterPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.newsletterPopupService
                    .open(NewsletterDialogComponent as Component, params['id']);
            } else {
                this.newsletterPopupService
                    .open(NewsletterDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
