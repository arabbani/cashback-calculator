import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AffiliateCredential } from './affiliate-credential.model';
import { AffiliateCredentialPopupService } from './affiliate-credential-popup.service';
import { AffiliateCredentialService } from './affiliate-credential.service';

@Component({
    selector: 'apsstr-affiliate-credential-delete-dialog',
    templateUrl: './affiliate-credential-delete-dialog.component.html'
})
export class AffiliateCredentialDeleteDialogComponent {

    affiliateCredential: AffiliateCredential;

    constructor(
        private affiliateCredentialService: AffiliateCredentialService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.affiliateCredentialService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'affiliateCredentialListModification',
                content: 'Deleted an affiliateCredential'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'apsstr-affiliate-credential-delete-popup',
    template: ''
})
export class AffiliateCredentialDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private affiliateCredentialPopupService: AffiliateCredentialPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.affiliateCredentialPopupService
                .open(AffiliateCredentialDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
