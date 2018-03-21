import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Affiliate } from './affiliate.model';
import { AffiliatePopupService } from './affiliate-popup.service';
import { AffiliateService } from './affiliate.service';

@Component({
    selector: 'apsstr-affiliate-delete-dialog',
    templateUrl: './affiliate-delete-dialog.component.html'
})
export class AffiliateDeleteDialogComponent {

    affiliate: Affiliate;

    constructor(
        private affiliateService: AffiliateService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.affiliateService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'affiliateListModification',
                content: 'Deleted an affiliate'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'apsstr-affiliate-delete-popup',
    template: ''
})
export class AffiliateDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private affiliatePopupService: AffiliatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.affiliatePopupService
                .open(AffiliateDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
