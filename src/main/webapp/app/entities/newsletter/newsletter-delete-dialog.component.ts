import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Newsletter } from './newsletter.model';
import { NewsletterPopupService } from './newsletter-popup.service';
import { NewsletterService } from './newsletter.service';

@Component({
    selector: 'apsstr-newsletter-delete-dialog',
    templateUrl: './newsletter-delete-dialog.component.html'
})
export class NewsletterDeleteDialogComponent {

    newsletter: Newsletter;

    constructor(
        private newsletterService: NewsletterService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.newsletterService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'newsletterListModification',
                content: 'Deleted an newsletter'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'apsstr-newsletter-delete-popup',
    template: ''
})
export class NewsletterDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private newsletterPopupService: NewsletterPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.newsletterPopupService
                .open(NewsletterDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
