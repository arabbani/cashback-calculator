import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CardProvider } from './card-provider.model';
import { CardProviderPopupService } from './card-provider-popup.service';
import { CardProviderService } from './card-provider.service';

@Component({
    selector: 'apsstr-card-provider-delete-dialog',
    templateUrl: './card-provider-delete-dialog.component.html'
})
export class CardProviderDeleteDialogComponent {

    cardProvider: CardProvider;

    constructor(
        private cardProviderService: CardProviderService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cardProviderService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cardProviderListModification',
                content: 'Deleted an cardProvider'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'apsstr-card-provider-delete-popup',
    template: ''
})
export class CardProviderDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cardProviderPopupService: CardProviderPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cardProviderPopupService
                .open(CardProviderDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
